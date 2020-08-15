import Express from "express";

import Router from "./Router"
import Database from "../Database";

export default class AuthRouter extends Router {
	constructor(db: Database, app: Express.Application) {
		super(db, app);
	}

	init() {
		this.app.get('/admin', async (req, res) => res.render('auth/login'));

		this.app.post('/admin/auth', async (req, res) => {
			try {
				const user = req.body.user;
				const pass = req.body.pass;

				if (typeof user != "string" || typeof pass != "string")
					throw "Request is missing required parameters.";

				res.send(await this.db.getAuthToken(user, pass));
			}
			catch (e) {
				this.routeError(res, 403, e);
			}
		});
	}
}
