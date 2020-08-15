import Express from "express"

import Database from "./Database"
import AuthRouter from "./router/AuthRouter"
import AdminRouter from "./router/AdminRouter"

export default class Admin {
	private db: Database;
	private app: Express.Application;
	private dataPath: string;

	private adminRouter: AdminRouter;
	private authRouter: AuthRouter;

	constructor(db: Database, app: Express.Application, dataPath: string) {
		this.db = db;
		this.app = app;
		this.dataPath = dataPath;

		this.authRouter = new AuthRouter(this.db, this.app);
		this.adminRouter = new AdminRouter(this.db, this.app);
	}

	async init() {
		this.adminRouter.init();
		this.authRouter.init();

		// this.app.get('/register', async (req, res) => res.render('auth/register'));

		// this.app.post('/register', async (req, res) => {
		// 	try {
		// 		const user: string = req.body.user;
		// 		const pass: string = req.body.pass;

		// 		if (typeof user != "string" || typeof pass != "string")
		// 			throw "Request is missing required parameters.";

		// 		if (!/^\w{3,32}$/g.test(user)) 
		// 			throw "Username must be 3-32 characters long, and only contain alphanumeric characters.";
		// 		if (!/.{8,}/g.test(pass) || !/\d+/g.test(pass) || !/[^\w ]+/g.test(pass)) 
		// 			throw "Password must be at least 8 characters long, and contain a letter and a symbol."

		// 		await this.db.createAccount(user, pass, false);
		// 		res.send(await this.db.getAuthToken(user, pass));
		// 	}
		// 	catch (e) {
		// 		this.routeError(res, 403, e);
		// 	}
		// });
	}
}
