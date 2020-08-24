import path from "path"
import Express from "express";
import { UploadedFile } from "express-fileupload";

import Router from "./Router";
import ThemeParser from "../ThemeParser";
import Database, { MediaStatus } from "../Database";

import sanitize from "../../../common/util/Sanitize";

export default class AdminRouter extends Router {
	constructor(db: Database, app: Express.Application, private themes: ThemeParser) {
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
				this.routeError(res, 403, e);
			}
		});

		this.app.post('/admin/media/upload', async (req, res) => {
			try {
				let user = await this.db.authUser(req);

				const file: UploadedFile = (req.files || {}).file as UploadedFile;
				if (!file) throw "Request is missing a file.";

				const name: string = req.body.name;
				const identifier: string = sanitize(req.body.identifier || req.body.name);

				if (typeof(name) != "string" || typeof(identifier) != "string")
					throw "Request is missing required data.";

				let status = await this.db.acceptMedia(user, file, name, identifier);
				if (status != MediaStatus.OK) res.status(409).send(status.toString());
				else res.status(202).send(status.toString());
			}
			catch (e) {
				this.routeError(res, 403, e);
			}
		});

		this.app.post('/admin/media/delete', async (req, res) => {
			try {
				await this.db.authUser(req);
				await this.db.deleteMedia(req.body);
				res.send(JSON.stringify(await this.db.getSiteData()));
			}
			catch (e) {
				this.routeError(res, 403, e);
			}
		});

		this.app.get('/admin/theme/cover/:identifier.jpg', async (req, res) => {
			try {
				await this.db.authUser(req);
				res.sendFile(path.join(this.db.dataPath, "themes", req.params.identifier, "cover.jpg"));
			}
			catch (e) {
				this.routeError(res, 403, e);
			}
		});

		this.app.post('/admin/theme/refresh', async (req, res) => {
			try {
				await this.db.authUser(req);
				await this.themes.refresh();
				res.send(JSON.stringify(await this.db.getSiteData()));
			}
			catch (e) {
				this.routeError(res, 403, e);
			}
		});

		this.app.post('/admin/theme/toggle', async (req, res) => {
			try {
				await this.db.authUser(req);
				await this.themes.toggle(req.body);
				res.send(JSON.stringify(await this.db.getSiteData()));
			}
			catch (e) {
				this.routeError(res, 403, e);
			}
		});

		this.app.use('/admin/asset', Express.static(path.join(path.dirname(__dirname), "../../admin/res")));
		this.app.get('/admin(/*)?', async (_, res) => res.render(path.join(path.dirname(__dirname), "../views/admin")));
	}
}
