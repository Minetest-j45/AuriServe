import Express from "express";
import Database from "../Database";

export default class Router {

	constructor(protected db: Database, protected app: Express.Application) {}

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
