import path from "path";
import HTTP from "http";
import HTTPS from "https";
import { promises as fs } from "fs";
import compression from "compression";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

import log4js from "log4js";
import Express from "express";
import bodyParser from "body-parser";

import Admin from "./Admin";
import Pages from "./Pages";

import Database from "./Database";
import Elements from "./Elements";
import ThemeParser from "./ThemeParser";
import PluginParser from "./PluginParser";

import { Config } from "./interface/Config";
import SiteData from '../../common/interface/SiteData';
import resolvePath from "../../common/util/ResolvePath";

const logger = log4js.getLogger()

export default class Server {
	admin: Admin;
	pages: Pages;
	
	app = Express();
	db = new Database(this.dataPath);

	themes = new ThemeParser(this);
	plugins = new PluginParser(this);
	elements = new Elements();

	constructor(public readonly conf: Config, public readonly dataPath: string) {
		this.app.use(compression());
		this.app.use(cookieParser());
		this.app.use(bodyParser.json());
		this.app.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp/' }));

		this.app.set('view engine', 'pug');
		this.app.set('views', path.join(path.dirname(__filename), "views"));

		this.admin = new Admin(this);
		this.pages = new Pages(this);
		
		this.init().then(async () => {		
			this.debugRoutes();

			await this.themes.init();
			await this.plugins.init();

			await this.admin.init();
			await this.pages.init();
		});
	}

	async getSiteData(): Promise<SiteData> {
		let data = await this.db.getSiteData();
		let confMap: {[key: string]: any} = {};
		this.elements.getAllElements().forEach((elem, key) => confMap[key] = elem.config);
		data.elementDefs = confMap;
		return data;
	}

	private async init() {
		await new Promise(async (resolve) => {
			if (this.conf.https) {
				if (!this.conf.https.cert || !this.conf.https.key) {
					logger.fatal("Config is missing https.cert and https.key fields.");
					process.exit(1);
				}
				
				let cert: string, key: string;
				try {
					cert = await fs.readFile(resolvePath(this.conf.https.cert), 'utf8');
					key = await fs.readFile(resolvePath(this.conf.https.key), 'utf8');
				}
				catch (e) {
					logger.fatal("Failed to access HTTPS certificate/key files.\n %s", e);
					process.exit(1);
				}

				const http = HTTP.createServer(this.forwardHttps.bind(this) as any);
				const https = HTTPS.createServer({ cert: cert, key: key }, this.app);

				http.listen(this.conf.port || 80, () => {
					logger.debug("Redirect server listening on port %s.", this.conf.port || 80);
					https.listen(this.conf.https!.port || 443, () => {
						logger.debug(`HTTPS Server listening on port %s.`, this.conf.https!.port || 443);
						resolve();
					});
				});
			}
			else {
				const http = HTTP.createServer(this.app);
				http.listen(this.conf.port || 80, () => {
					logger.debug(`HTTP Server listening on port %s.`, this.conf.port || 80);
					resolve();
				});
			}
		});
		
		if (!this.conf.db || !this.conf.db.url) {
			logger.fatal("Config is missing db.url field.");
			process.exit(1);
		}

		await this.db.init(this.conf.db.url, this.conf.db.name || "auriserve");

		logger.info("Initialized AuriServe.");
	}

	private debugRoutes() {
		this.app.get('*', (req, _, next) => {
			logger.debug("GET %s", req.params[0]);
			next();
		});

		this.app.post('*', (req, _, next) => {
			logger.debug("POST %s", req.params[0]);
			next();
		});
	}

	private forwardHttps(req: Express.Request, res: Express.Response) {
		const host = req.headers['host'];
		if (!host || typeof host != "string") {
			res.status(403);
			return;
		}

		const loc = "https://" + host.replace((this.conf.port || 80).toString(), (this.conf.https!.port || 443).toString()) + req.url;
		res.writeHead(301, { Location: loc });
		res.end();
	}
}
