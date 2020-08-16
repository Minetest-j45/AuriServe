import path from "path"
// import log4js from "log4js"
// const logger = log4js.getLogger()
import Express from "express";

import Router from "./Router"
import Database from "../Database";

export default class AdminRouter extends Router {
	constructor(db: Database, app: Express.Application) {
		super(db, app);
	}

	init() {
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

		this.app.get('/admin/data', async (req, res) => {
			try {
				await this.db.authUser(req);
				res.send(JSON.stringify(await this.db.getSiteData()));
			}
			catch (e) {
				console.log(e);
				this.routeError(res, 403, e);
			}
		});

		this.app.use('/admin/asset', Express.static(path.join(path.dirname(path.dirname(__dirname)), "../admin/res")));
		this.app.get('/admin(/*)?', async (_, res) => res.render('admin.pug'));
	}
}
