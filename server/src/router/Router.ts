import Express from "express";

import Server from "../Server";

export default class Router {
	router: Express.Router = Express.Router();

	constructor(protected server: Server) {}

	protected routeError(res: any, code: number, e: any) {
		if (typeof e == "string") {
			res.status(code).send(e);
		}
		else {
			res.sendStatus(code);
			console.log(e);
		}
	}
}
