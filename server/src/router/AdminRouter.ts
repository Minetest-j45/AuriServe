import path from "path"
import Express from "express";
import { UploadedFile } from "express-fileupload";

import Router from "./Router";
import Server from "../Server";
import { MediaStatus } from "../Database";

import sanitize from "../../../common/util/Sanitize";

export default class AdminRouter extends Router {
	constructor(server: Server) {
		super(server);
	}

	init() {
		this.router.get('/plugin/:identifier.js', (req, res) => {
			const plugins = this.server.plugins.getEnabledPlugins().filter(p => p.conf.identifier == req.params.identifier);
			if (plugins.length != 1) { res.sendStatus(404); return; }
			const plugin = plugins[0];

			if (!plugin.conf.sources.admin) { res.sendStatus(404); return; }
			res.sendFile(path.join(this.server.dataPath, "plugins", plugin.conf.identifier, plugin.conf.sources.admin));
		});

		this.router.post('/auth', async (req, res) => {
			try {
				const user = req.body.user;
				const pass = req.body.pass;

				if (typeof user != "string" || typeof pass != "string")
					throw "Request is missing required parameters.";

				res.send(await this.server.db.getAuthToken(user, pass));
			}
			catch (e) {
				this.routeError(res, 403, e);
			}
		});

		this.router.get('/data', async (req, res) => {
			try {
				await this.server.db.authUser(req);
				res.send(JSON.stringify(await this.server.getSiteData()));
			}
			catch (e) {
				this.routeError(res, 403, e);
			}
		});

		this.router.post('/media/upload', async (req, res) => {
			try {
				let user = await this.server.db.authUser(req);

				const file: UploadedFile = (req.files || {}).file as UploadedFile;
				if (!file) throw "Request is missing a file.";

				const name: string = req.body.name;
				const identifier: string = sanitize(req.body.identifier || req.body.name);

				if (typeof(name) != "string" || typeof(identifier) != "string")
					throw "Request is missing required data.";

				let status = await this.server.db.acceptMedia(user, file, name, identifier);
				if (status != MediaStatus.OK) res.status(409).send(status.toString());
				else res.status(202).send(status.toString());
			}
			catch (e) {
				this.routeError(res, 403, e);
			}
		});

		this.router.post('/media/delete', async (req, res) => {
			try {
				await this.server.db.authUser(req);
				await this.server.db.deleteMedia(req.body);
				res.send(JSON.stringify(await this.server.getSiteData()));
			}
			catch (e) {
				this.routeError(res, 403, e);
			}
		});

		this.router.get('/themes/cover/:identifier.jpg', async (req, res) => {
			try {
				await this.server.db.authUser(req);
				res.sendFile(path.join(this.server.db.dataPath, "themes", req.params.identifier, "cover.jpg"));
			}
			catch (e) {
				this.routeError(res, 403, e);
			}
		});

		this.router.post('/themes/refresh', async (req, res) => {
			try {
				await this.server.db.authUser(req);
				await this.server.themes.refresh();
				res.send(JSON.stringify(await this.server.getSiteData()));
			}
			catch (e) {
				this.routeError(res, 403, e);
			}
		});

		this.router.post('/themes/toggle', async (req, res) => {
			try {
				await this.server.db.authUser(req);
				await this.server.themes.toggle(req.body);
				res.send(JSON.stringify(await this.server.getSiteData()));
			}
			catch (e) {
				this.routeError(res, 403, e);
			}
		});

		this.router.get('/plugins/cover/:identifier.jpg', async (req, res) => {
			try {
				await this.server.db.authUser(req);
				res.sendFile(path.join(this.server.db.dataPath, "plugins", req.params.identifier, "cover.jpg"));
			}
			catch (e) {
				this.routeError(res, 403, e);
			}
		});

		this.router.post('/plugins/refresh', async (req, res) => {
			try {
				await this.server.db.authUser(req);
				await this.server.plugins.refresh();
				res.send(JSON.stringify(await this.server.getSiteData()));
			}
			catch (e) {
				this.routeError(res, 403, e);
			}
		});

		this.router.post('/plugins/toggle', async (req, res) => {
			try {
				await this.server.db.authUser(req);
				await this.server.plugins.toggle(req.body);
				res.send(JSON.stringify(await this.server.getSiteData()));
			}
			catch (e) {
				this.routeError(res, 403, e);
			}
		});

		this.router.use('/asset', Express.static(path.join(path.dirname(__dirname), "../../admin/res")));
		this.router.get('(/*)?', async (_, res) => res.render(path.join(path.dirname(__dirname), "../views/admin"), {
			plugins: this.server.plugins.getEnabledPlugins().filter(p => p.conf.sources.admin).map(p => p.conf.identifier)}));

		this.server.app.use('/admin', this.router);
	}
}
