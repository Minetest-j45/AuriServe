import path from 'path';
import HTTP from 'http';
import HTTPS from 'https';
import log4js from 'log4js';
import Express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import { promises as fs, constants as fsc } from 'fs';
import { SiteData, SiteDataSpecifier, resolvePath } from 'auriserve-api';

import DBView from './DBView';
import Database from './Database';
import Elements from './Elements';
import PluginParser from './PluginParser';
import PagesManager from './PagesManager';

import AdminRouter from './router/AdminRouter';
import PagesRouter from './router/PagesRouter';
import SuperUserPrompt from './SuperUserPrompt';

import { Config } from './interface/Config';

import { graphql } from 'graphql';
import { Schema, Resolver } from './graph';

const logger = log4js.getLogger();

export default class Server {
	adminRouter: AdminRouter;
	pagesRouter: PagesRouter;

	app = Express();
	db = new Database(this.dataPath);

	elements: Elements;
	pages: PagesManager;
	plugins: PluginParser;

	constructor(public readonly conf: Config, public readonly dataPath: string) {
		this.app.use(compression());
		this.app.use(cookieParser());
		this.app.use(bodyParser.json());
		this.app.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp/' }));

		this.app.set('view engine', 'pug');
		this.app.set('views', path.join(path.dirname(__dirname), 'views'));

		const view = this.db as any as DBView;

		this.elements = new Elements();
		this.plugins = new PluginParser(this.dataPath, view, this.elements);
		this.pages = new PagesManager(this.plugins, this.elements, view, this.getSiteData, this.dataPath);

		this.adminRouter = new AdminRouter(this.dataPath, this.db as any as DBView,
			this.app, this.pages.themes, this.plugins, this.pages, this.getSiteData);

		this.pagesRouter = new PagesRouter(this.dataPath, this.app, this.pages, this.plugins);

		this.init().then(async () => {
			await this.pages.init();
			await this.plugins.init();
			
			// Create media folder
			try { await fs.access(path.join(this.dataPath, 'media'), fsc.R_OK); }
			catch (e) { fs.mkdir(path.join(this.dataPath, 'media')); }
			try { await fs.access(path.join(this.dataPath, 'media', '.cache'), fsc.R_OK); }
			catch (e) { fs.mkdir(path.join(this.dataPath, 'media', '.cache')); }

			if (this.conf.super)
				new SuperUserPrompt(this.db);

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
		let data = await this.db.getSiteData(specifier);

		const specifiers = (specifier ? specifier.split('&') as SiteDataSpecifier[] : []);

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

		await this.db.init(this.conf.db.url, this.conf.db.name);

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
}
