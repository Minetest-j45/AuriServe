import path from 'path';
import HTTP from 'http';
import HTTPS from 'https';
import log4js from 'log4js';
import Express from 'express';
import { promises as fs } from 'fs';
import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import { SiteData, SiteDataSpecifier, resolvePath } from 'auriserve-api';

import * as Auth from './data/Auth';
import Media from './data/Media';
import Elements from './Elements';
import Plugins from './data/Plugins';
import PagesManager from './PagesManager';

import Properties from './data/model/Properties';

// import * as Auth from './data/Auth';
import { init as initDatabase } from './data/Database';

import AdminRouter from './router/AdminRouter';
import PagesRouter from './router/PagesRouter';
// import SuperUserPrompt from './SuperUserPrompt';

import { Config } from './ServerConfig';

const logger = log4js.getLogger();

export default class Server {
	private app = Express();
	private adminRouter: AdminRouter;
	private pagesRouter: PagesRouter;

	private elements: Elements;
	private pages: PagesManager;
	private plugins: Plugins;
	private media: Media;

	constructor(public readonly conf: Config, public readonly dataPath: string) {
		this.app.use(compression());
		this.app.use(cookieParser());
		this.app.use(bodyParser.json());
		this.app.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp/' }));

		this.app.set('view engine', 'pug');
		this.app.set('views', path.join(path.dirname(__dirname), 'views'));

		this.elements = new Elements();
		this.media = new Media(this.dataPath);
		this.plugins = new Plugins(this.dataPath, this.elements);
		this.pages = new PagesManager(this.plugins, this.elements, this.getSiteData, this.dataPath);

		this.adminRouter = new AdminRouter(this.dataPath, this.app,
			this.pages.themes, this.plugins, this.media, this.pages, this.getSiteData);

		this.pagesRouter = new PagesRouter(this.dataPath, this.app, this.pages, this.plugins);

		this.init().then(async () => {
			await this.pages.init();
			await this.plugins.init();

			// if (this.conf.super)
			//	 new SuperUserPrompt(this.db);

			await this.adminRouter.init();
			await this.pagesRouter.init();

			// graphql(Schema, '{ info { domain, favicon, name, description } }', Resolver, { db: this.db }).then(console.log);

		});
	}


	/**
	 * Returns a Partial<SiteData> object.
	 *
	 * @param {string} specifier - A ampersand-separated string containing one or more specifiers.
	 *
	 * Specifiers:
	 * info - Basic state and enabled themes and plugins.
	 * users - User listings
	 * media - Media listings
	 * themes - Theme listings
	 * plugins - Plugin listings
	 * elements - Element definitions
	 * pages - Basic page listings
	 */

	getSiteData = async (specifier: string | undefined): Promise<Partial<SiteData>> => {
		const specifiers = (specifier ? specifier.split('&') as SiteDataSpecifier[] : []);

		let data: Partial<SiteData> = {};

		if (specifiers.includes('info')) {
			const d = (await Properties.findOne({}))!;
			data.domain = d.info.domain;
			data.sitename = d.info.name;
			data.favicon = d.info.favicon as any;
			data.description = d.info.description;
			data.mediaMax = d.usage.media_allocated;
			data.mediaUsed = d.usage.media_used;
			data.enabledThemes = this.pages.themes.listEnabled().map(t => t.config.identifier);
			data.enabledPlugins = this.plugins.listEnabled().map(t => t.config.identifier);
		}

		if (specifiers.includes('users')) {
			data.users = (await Auth.listUsers()).map(u => ({
				identifier: u.username,
				name: u.username,
				roles: u.roles
			}));
		}

		// @ts-ignore
		if (specifiers.includes('media')) data.media = await this.media.listMedia();

		// if (specifiers.includes('roles')) data.roles =
		// 	await (await this.db!.collection('roles').find({})).toArray();


		// @ts-ignore
		if (specifiers.includes('themes')) data.themes = this.pages.themes.listAll().map(t => t.config);
		// @ts-ignore
		if (specifiers.includes('plugins')) data.plugins = this.plugins.listAll().map(t => t.config);

		// if (specifiers.includes('users')) {
		// 	let users = await (await this.db!.collection('accounts').find({})).toArray();
		// 	users.forEach((u) => delete u.pass);
		// 	data.users = users;
		// }

		if (specifiers.includes('elements')) {
			let confMap: {[key: string]: any} = {};
			this.elements.getAllElements().forEach((elem, key) => confMap[key] = elem.config);
			data.elementDefs = confMap;
		}

		if (specifiers.includes('pages'))
			data.pages = await this.pages.getAllPages();

		return data;
	};


	/**
	 * Initializes the server.
	 * Throws if there are configuration or database errors.
	 */

	private async init() {
		
		// Initialize HTTP / HTTPS server(s).

		await new Promise<void>(async (resolve) => {
			try {
				if (this.conf.https) {
					if (!this.conf.https.cert || !this.conf.https.key)
						throw 'Config is missing https.cert or https.key fields.';

					let cert: string, key: string;
					try {
						cert = await fs.readFile(resolvePath(this.conf.https.cert), 'utf8');
						key = await fs.readFile(resolvePath(this.conf.https.key), 'utf8');
					}
					catch (e) {
						throw 'Failed to parse HTTPS key / certificate files.\n ' + e;
					}

					const http = HTTP.createServer(this.forwardHttps.bind(this) as any);
					const https = HTTPS.createServer({ cert: cert, key: key }, this.app);

					http.listen(this.conf.port || 80, () => {
						logger.debug('Redirect server listening on port %s.', this.conf.port || 80);
						https.listen(this.conf.https!.port || 443, () => {
							logger.debug('HTTPS Server listening on port %s.', this.conf.https!.port || 443);
							resolve();
						});
					});
				}
				else {
					const http = HTTP.createServer(this.app);
					http.listen(this.conf.port || 80, () => {
						logger.debug('HTTP Server listening on port %s.', this.conf.port || 80);
						resolve();
					});
				}
			}
			catch (e) {
				logger.fatal(e);
				process.exit(1);
			}
		});

		if (!this.conf.db || !this.conf.db.url || !this.conf.db.name) {
			logger.fatal('Config is missing db.url or db.name fields.');
			process.exit(1);
		}

		await initDatabase(this.conf.db.url, this.conf.db.name);
		await Promise.all((await Auth.listUsers()).map(u => Auth.removeUser(u._id)));
		await Auth.addUser('Auri', 'password');

		process.on('SIGINT',  () => this.shutdown());
		process.on('SIGQUIT', () => this.shutdown());
		process.on('SIGTERM', () => this.shutdown());

		logger.info('Initialized AuriServe.');
	}


	/**
	 * Routing function to forward HTTP traffic to HTTPS.
	 *
	 * @param {Express.Request} req - The request object.
	 * @param {Express.Response} res - The response object.
	 */

	private forwardHttps(req: Express.Request, res: Express.Response) {
		const host = req.headers.host;
		if (!host) {
			res.status(403);
			return;
		}

		const loc = 'https://' + host.replace((this.conf.port || 80).toString(), (this.conf.https!.port || 443).toString()) + req.url;
		res.writeHead(301, { Location: loc });
		res.end();
	}


	/**
	 * Shuts down the server, saving required data.
	 */

	private async shutdown() {
		logger.info('Shutting down AuriServe.');
		await Promise.all([
			this.plugins.cleanup(),
			this.pages.themes.cleanup()
		]);
		process.exit();
	}
}
