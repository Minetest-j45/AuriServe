import Express from "express";

import Database from "./Database";
import ThemeParser from "./ThemeParser";
import AdminRouter from "./router/AdminRouter";

export default class Admin {
	private adminRouter = new AdminRouter(this.db, this.app, this.themes);

	constructor(private db: Database, private app: Express.Application, private themes: ThemeParser) {}

	async init() {
		this.adminRouter.init();
	}
}
