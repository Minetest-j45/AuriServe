import path from "path"
import Express from "express";
import { UploadedFile } from "express-fileupload";

import Router from "./Router";
import Server from "../Server";
import { MediaStatus } from "../Database";

import sanitize from "../../../common/util/Sanitize";

export default class AdminRouter extends Router {
	authenticated: Express.Router = Express.Router();

	constructor(server: Server) {
		super(server);
	}

	init() {
		/*
		* Authentication Routes
		*/

		this.router.post('/auth', async (req, res) => {
			await this.routeSafely(res, async () => {
				const user = req.body.user;
				const pass = req.body.pass;

				if (typeof user != "string" || typeof pass != "string")
					throw "Request is missing required parameters.";

				res.send(await this.server.db.getAuthToken(user, pass));
			});
		});

		/*
		* Data Routes
		*/

		this.router.get('/data/:specifier?', async (req, res, next) => {
			await this.routeAuthenticated(req, res, next, async () => {
				res.send(JSON.stringify(await this.server.db.getSiteData(req.params.specifier)));
			});
		});

		/*
		* Media Routes
		*/

		this.router.post('/media/upload', async (req, res, next) => {
			await this.routeAuthenticated(req, res, next, async () => {
				const user = await this.server.db.authUser(req);

				const file: UploadedFile = (req.files || {}).file as UploadedFile;
				if (!file) throw "Request is missing a file.";

				const name: string = req.body.name;
				const identifier: string = sanitize(req.body.identifier || req.body.name);

				if (typeof(name) != "string" || typeof(identifier) != "string")
					throw "Request is missing required data.";

				let status = await this.server.db.acceptMedia(user, file, name, identifier);
				if (status != MediaStatus.OK) res.status(409).send(status.toString());
				else res.status(202).send(status.toString());
			});
		});

		this.router.post('/media/delete', async (req, res, next) => {
			await this.routeAuthenticated(req, res, next, async () => {
				//TODO: Sanitize the fuck out of this
				await this.server.db.deleteMedia(req.body);
				res.send(JSON.stringify(await this.server.db.getSiteData('media')));
			});
		});

		/*
		* Theme Routes
		*/

		this.router.get('/themes/cover/:identifier.jpg', async (req, res, next) => {
			await this.routeAuthenticated(req, res, next, async () => {
				res.sendFile(path.join(this.server.db.dataPath, "themes", req.params.identifier, "cover.jpg"));
			});
		});

		this.router.post('/themes/refresh', async (req, res, next) => {
			await this.routeAuthenticated(req, res, next, async () => {
				await this.server.themes.refresh();
				res.send(JSON.stringify(await this.server.db.getSiteData('themes&info')));
			});
		});

		this.router.post('/themes/toggle', async (req, res, next) => {
			await this.routeAuthenticated(req, res, next, async () => {
				//TODO: Santiize the fuck outa this too
				await this.server.themes.toggle(req.body);
				res.send(JSON.stringify(await this.server.db.getSiteData('info')));
			});
		});

		/*
		* Plugin Routes
		*/

		this.router.get('/plugins/cover/:identifier.jpg', async (req, res, next) => {
			await this.routeAuthenticated(req, res, next, async () => {
				res.sendFile(path.join(this.server.db.dataPath, "plugins", req.params.identifier, "cover.jpg"));
			});
		});

		this.router.post('/plugins/refresh', async (req, res, next) => {
			await this.routeAuthenticated(req, res, next, async () => {
				await this.server.plugins.refresh();
				res.send(JSON.stringify(await this.server.db.getSiteData('plugins&info')));
			});
		});

		this.router.post('/plugins/toggle', async (req, res, next) => {
			await this.routeAuthenticated(req, res, next, async () => {
				await this.server.plugins.toggle(req.body);
				res.send(JSON.stringify(await this.server.db.getSiteData('info')));
			});
		});

		/*
		* Element Routes
		*/

		this.router.post('/elements/create', async (req, res, next) => {
			await this.routeAuthenticated(req, res, next, async () => {
				const element = req.body.element;
				const identifier = req.body.identifier;
				const props = JSON.stringify(req.body.props);

				if (typeof(identifier) != 'string' || typeof(element) != 'string') 
					throw 'Request is missing required data.';

				if (sanitize(identifier) != identifier) 
					throw 'Identifier was not a properly sanitized value.';
				
				if (!this.server.elements.getAllElements().get(element))
					throw 'Element of type ' + element + ' is not currently loaded.';

				await this.server.db.createElement(req.body.identifier, req.body.element, props);
			});
		});
		
		/*
		* Basic App Content
		*/

		this.router.use('/asset', Express.static(path.join(path.dirname(__dirname), "../../admin/res")));

		this.router.get('(/*)?', async (_, res) => res.render(path.join(path.dirname(__dirname), "../views/admin"), {
			scripts: this.server.plugins.getEnabledPlugins().filter(p => p.conf.sources.admin).map(p => p.conf.identifier + "/" + p.conf.sources.admin),
			styles: this.server.plugins.getEnabledPlugins().filter(p => p.conf.sources.style).map(p => p.conf.identifier + "/" + p.conf.sources.style)
		}));

		this.server.app.use('/admin', this.router);
	}

	protected async routeAuthenticated(req: Express.Request, res: Express.Response, next: Express.NextFunction, fn: () => void, code?: number) {
		try {
			await this.server.db.authUser(req);
			await this.routeSafely(res, fn, code);
		}
		catch (e) {
			next();
		}
	}
}
