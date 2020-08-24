import path from "path"
import HTTP from "http"
import HTTPS from "https"
import cookieParser from "cookie-parser"
import fileUpload from "express-fileupload"
import { promises as fs } from "fs"

import log4js from "log4js"
import Express from "express"
import bodyParser from "body-parser"

import Admin from "./Admin"
import Database from "./Database"
import ThemeParser from "./ThemeParser";
import SuperUserPrompt from "./SuperUserPrompt"

import { Config } from "./interface/Config"
import resolvePath from "../../common/util/ResolvePath"

const logger = log4js.getLogger()

export default class Server {

	private admin: Admin;
	private app = Express();
	private db = new Database(this.dataPath);
	private themes = new ThemeParser(this.db);

	constructor(private conf: Config, private dataPath: string) {

		this.app.use(cookieParser());
		this.app.use(bodyParser.json());
		this.app.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp/' }));

		this.app.set('view engine', 'pug');
		this.app.set('views', path.join(path.dirname(__filename), "views"));

		this.admin = new Admin(this.db, this.app, this.themes);
		
		this.init().then(async () => {
			// Create a superuser account if the super parameter is set.
			if (this.conf.super) new SuperUserPrompt(this.db);
			
			// Initialize everything
			await this.admin.init();
			await this.themes.init();

			// Debug Network Requests
			this.app.get('*', (req, res, next) => {
				logger.debug("GET %s", req.params[0]);
				this.resolvePage(req, res, next);
			});

			this.app.post('*', (req, _, next) => {
				logger.debug("POST %s", req.params[0]);
				next();
			});

			// Set up static route
			this.app.use('/media', Express.static(path.join(dataPath, "media")));
			this.app.use('/theme', Express.static(path.join(dataPath, "themes", "public")));
		});
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

	private async resolvePage(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
		const root = path.join(path.dirname(__dirname), "views");
		const props = { basedir: root, themes: this.themes.getActiveThemes() };
		
		let page = path.join(this.dataPath, "pages", req.params[0]);

		try {
			res.render(page, props);
		} catch (e) { next(); }
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
