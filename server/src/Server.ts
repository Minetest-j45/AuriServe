import path from "path"
import HTTP from "http"
import HTTPS from "https"
import cookieParser from "cookie-parser"
import fileUpload from "express-fileupload"
import { promises as fs, constants as fsc } from "fs"

import log4js from "log4js"
const logger = log4js.getLogger()
import bodyParser from "body-parser"
import Express from "express"

import Admin from "./Admin"
import Database from "./Database"
import { Config } from "./interface/Config"
import resolvePath from "../../common/util/ResolvePath"

export default class Server {
	private conf: Config;
	private dataPath: string;

	private app: Express.Application = Express();
	private db: Database;
	private admin: Admin;

	constructor(conf: Config, dataPath: string) {
		this.conf = conf;
		this.dataPath = dataPath;

		this.db = new Database(dataPath);

		this.app.use(cookieParser());
		this.app.use(bodyParser.json());
		this.app.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp/' }));

		this.app.set('view engine', 'pug');
		this.app.set('views', path.join(path.dirname(__filename), "views"));

		this.admin = new Admin(this.db, this.app, dataPath);
		
		this.init().then(async () => {
			// Create a superuser account if the super parameter is set.
			if (this.conf["super"]) {
				const prompt = require("prompt");
				prompt.start();
				prompt.message = "";
				prompt.delimiter = "";

				prompt.get([{
					name: "username",
					description: "Please enter a username:",
					message: "Username must be between 3 and 32 characters long.",
					pattern: /^\w{3,32}$/g,
					required: true
				}, {
					name: "password",
					description: "Please enter a password:",
					message: "Password must be at least 8 characters long.",
					pattern: /.{8,}/g,
					required: true,
					hidden: true,
					replace: "*"
				}, {
					name: "erase",
					description: "Erase other Superusers? Type 'yes' to confirm:",
					required: false
				}], async (err: string, result: {username: string, password: string, erase: string}) => {
						prompt.stop();

						if (err) {
							logger.fatal("Failed to create a superuser.\n %s", err);
							process.exit(1);
						}

						if (result.erase.toLowerCase() == "yes") this.db.deleteSuperAccounts();
						try {
							await this.db.createAccount(result.username, result.password, true);
							logger.info("Created new superuser account %s.", result.username);
						}
						catch (e) {
							logger.info("Failed to create new superuser account %s.\n %s", result.username, e);
							process.exit(1);
						}
				});
			}

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
			
			// Initialize admin backend
			await this.admin.init();
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
		let page = path.join(this.dataPath, "pages", req.params[0] != "/" ? req.params[0] : "index");
		try {
			await fs.access(page + ".pug", fsc.R_OK);
			res.render(page);
		}
		catch (e) { next(); }
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
