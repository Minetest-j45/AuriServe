import Express from "express";

import Server from "../Server";

export default class Router {
	router: Express.Router = Express.Router();

	constructor(protected server: Server) {}

	protected async routeSafely(res: Express.Response, fn: () => void, code?: number) {
		try {
			await fn();
		}
		catch (e) {
			this.routeError(res, e, code);
		}
	}

	protected routeError(res: Express.Response, e: any, code?: number, ) {
		if (typeof e == "string") {
			res.status(code ?? 403).send(e);
		}
		else {
			res.sendStatus(code ?? 403);
			console.log(e);
		}
	}
}
