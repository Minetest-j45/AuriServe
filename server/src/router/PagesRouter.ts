import path from "path"
import log4js from "log4js";
import Express from "express";
import { promises as fs } from "fs";

import Router from "./Router";
import Server from "../Server";
import PageAssembler from "../PageAssembler";

const logger = log4js.getLogger();


export default class PagesRouter extends Router {
	constructor(server: Server) {
		super(server);
	}

	init() {
		this.server.app.get('*', (req, res, next) => {
			this.resolvePage(req, res, next);
		});
	}

	private async resolvePage(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
		const root = path.join(path.dirname(path.dirname(__dirname)), "views");
		let page = path.join(this.server.dataPath, "pages", req.params[0]);

		try {
			await fs.access(page + ".pug");
			res.send(await new PageAssembler(this.server.themes, this.server.pages.elements, root, page).assemble());
		}
		catch (e) {
			if (e.code != "ENOENT") logger.error("Encountered an error assembling file %s.\n %s", page, e);
			next();
		}
	}
}
