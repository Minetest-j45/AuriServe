import path from "path"
import log4js from "log4js";
import Express from "express";
import { promises as fs} from "fs";

import Router from "./Router";
import Server from "../Server";
import PageAssembler from "../PageAssembler";

const logger = log4js.getLogger();


export default class PagesRouter extends Router {
	constructor(server: Server) {
		super(server);
	}

	init() {
		this.router.get('*', (req, res, next) => {
			this.resolvePage(req, res, next);
		});

		this.router.use('/media', Express.static(path.join(this.server.dataPath, "media")));
		this.router.use('/theme', Express.static(path.join(this.server.dataPath, "themes", "public")));

		this.router.use('/plugin/:identifier/:file', async (req, res, next) => {
			try {
				let plugins = this.server.plugins.getEnabledPlugins().filter(p => p.conf.identifier === req.params.identifier);
				if (plugins.length == 0) throw `There is no loaded plugin with identifier ${req.params.identifier}.`;
				Express.static(path.join(this.server.dataPath, "plugins", req.params.identifier, plugins[0].conf.sourceRoot, req.params.file))(req, res, next);
			}
			catch (e) {
				res.status(403).send(e);
			}
		});
		
		this.router.get('/plugin/styles/:identifier.css', (req, res) => {
			const plugins = this.server.plugins.getEnabledPlugins().filter(p => p.conf.identifier == req.params.identifier);
			if (plugins.length != 1) { res.sendStatus(404); return; }
			const plugin = plugins[0];

			if (!plugin.conf.sources.style) { res.sendStatus(404); return; }
			res.sendFile(path.join(this.server.dataPath, "plugins", plugin.conf.identifier, plugin.conf.sources.style));
		});

		this.server.app.use(this.router);
	}

	private async resolvePage(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
		const root = path.join(path.dirname(path.dirname(__dirname)), "views");
		let page = path.join(this.server.dataPath, "pages", req.params[0]);

		try {
			try {
				await fs.access(page + ".pug");
			}
			catch (e) {
				await fs.access(path.join(page, "index.pug"));
				page = path.join(page, "index");
			}

			res.send(await new PageAssembler(this.server.themes, this.server.plugins, this.server.elements, root, page).assemble());
		}
		catch (e) {
			if (e.code != "ENOENT") logger.error("Encountered an error assembling file %s.\n %s", page, e);
			next();
		}
	}
}
