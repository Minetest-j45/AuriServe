import Express from "express"

import Database from "./Database"
import AdminRouter from "./router/AdminRouter"

export default class Admin {
	private db: Database;
	private app: Express.Application;
	// private dataPath: string;

	private adminRouter: AdminRouter;

	constructor(db: Database, app: Express.Application, _: string) {
		this.db = db;
		this.app = app;
		// this.dataPath = dataPath;

		this.adminRouter = new AdminRouter(this.db, this.app);
	}

	async init() {
		this.adminRouter.init();
	}
}
