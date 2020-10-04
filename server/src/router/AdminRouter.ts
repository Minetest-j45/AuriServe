import path from "path"
import Express from "express";
import { UploadedFile } from "express-fileupload";

import Router from "./Router";
import DBView from '../DBView';
import ThemeParser from '../ThemeParser';
import { MediaStatus } from "../Database";
import PagesManager from '../PagesManager';
import PluginParser from '../PluginParser';

import sanitize from "../../../common/util/Sanitize";
import { PartialSiteData } from "../../../common/interface/SiteData";

export default class AdminRouter extends Router {
	authenticated: Express.Router = Express.Router();

	constructor(private dataPath: string, private db: DBView, private app: Express.Application, 
		private themes: ThemeParser, private plugins: PluginParser, private pages: PagesManager,
		private getSiteData: (specifier: string | undefined) => Promise<PartialSiteData>) { super(); }

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

				res.send(await this.db.getAuthToken(user, pass));
			});
		});

		/*
		* Data Routes
		*/

		this.router.get('/data/:specifier?', async (req, res, next) => {
			await this.routeAuthenticated(req, res, next, async () => {
				res.send(JSON.stringify(await this.getSiteData(req.params.specifier)));
			});
		});

		this.router.post('/page-data/', async(req, res, next) => {
			await this.routeAuthenticated(req, res, next, async () => {
				if (!req.body.page || typeof(req.body.page) !== "string") 
					throw "Request is missing required data.";
					
				const data = await this.pages.getPage(req.body.page);
				res.send(JSON.stringify(data));
			});
		});

		/*
		* Media Routes
		*/

		this.router.post('/media/upload', async (req, res, next) => {
			await this.routeAuthenticated(req, res, next, async () => {
				const user = await this.db.authUser(req);

				const file: UploadedFile = (req.files || {}).file as UploadedFile;
				if (!file) throw "Request is missing a file.";

				const name: string = req.body.name;
				const identifier: string = sanitize(req.body.identifier || req.body.name);

				if (typeof(name) != "string" || typeof(identifier) != "string")
					throw "Request is missing required data.";

				let status = await this.db.acceptMedia(user, file, name, identifier);
				if (status != MediaStatus.OK) res.status(409).send(status.toString());
				else res.status(202).send(status.toString());
			});
		});

		this.router.post('/media/delete', async (req, res, next) => {
			await this.routeAuthenticated(req, res, next, async () => {
				//TODO: Sanitize the fuck out of this
				await this.db.deleteMedia(req.body);
				res.send(JSON.stringify(await this.getSiteData('media')));
			});
		});

		/*
		* Theme Routes
		*/

		this.router.get('/themes/cover/:identifier.jpg', async (req, res, next) => {
			await this.routeAuthenticated(req, res, next, async () => {
				res.sendFile(path.join(this.dataPath, "themes", req.params.identifier, "cover.jpg"));
			});
		});

		this.router.post('/themes/refresh', async (req, res, next) => {
			await this.routeAuthenticated(req, res, next, async () => {
				await this.themes.refresh();
				res.send(JSON.stringify(await this.getSiteData('themes&info')));
			});
		});

		this.router.post('/themes/toggle', async (req, res, next) => {
			await this.routeAuthenticated(req, res, next, async () => {
				//TODO: Santiize the fuck outa this too
				await this.themes.toggle(req.body);
				res.send(JSON.stringify(await this.getSiteData('info')));
			});
		});

		/*
		* Plugin Routes
		*/

		this.router.get('/plugins/cover/:identifier.jpg', async (req, res, next) => {
			await this.routeAuthenticated(req, res, next, async () => {
				res.sendFile(path.join(this.dataPath, "plugins", req.params.identifier, "cover.jpg"));
			});
		});

		this.router.post('/plugins/refresh', async (req, res, next) => {
			await this.routeAuthenticated(req, res, next, async () => {
				await this.plugins.refresh();
				res.send(JSON.stringify(await this.getSiteData('plugins&info')));
			});
		});

		this.router.post('/plugins/toggle', async (req, res, next) => {
			await this.routeAuthenticated(req, res, next, async () => {
				await this.plugins.toggle(req.body);
				res.send(JSON.stringify(await this.getSiteData('info')));
			});
		});

		/*
		* Element Routes
		*/

		// this.router.post('/elements/create', async (req, res, next) => {
		// 	await this.routeAuthenticated(req, res, next, async () => {
		// 		const element = req.body.element;
		// 		const identifier = req.body.identifier;
		// 		const props = JSON.stringify(req.body.props);

		// 		if (typeof(identifier) != 'string' || typeof(element) != 'string') 
		// 			throw 'Request is missing required data.';

		// 		if (sanitize(identifier) != identifier) 
		// 			throw 'Identifier was not a properly sanitized value.';
				
		// 		if (!this.elements.getAllElements().get(element))
		// 			throw 'Element of type ' + element + ' is not currently loaded.';

		// 		await this.db.createElement(req.body.identifier, req.body.element, props);
		// 	});
		// });
		
		/*
		* Basic App Content
		*/

		this.router.use('/asset', Express.static(path.join(path.dirname(__dirname), "../../admin/res")));

		this.router.get('(/*)?', async (_, res) => res.render(path.join(path.dirname(__dirname), "../views/admin"), {
			scripts: this.plugins.getEnabledPlugins().filter(p => p.conf.sources.admin).map(p => p.conf.identifier + "/" + p.conf.sources.admin),
			styles: this.plugins.getEnabledPlugins().filter(p => p.conf.sources.style).map(p => p.conf.identifier + "/" + p.conf.sources.style)
		}));

		this.app.use('/admin', this.router);
	}

	protected async routeAuthenticated(req: Express.Request, res: Express.Response, next: Express.NextFunction, fn: () => void, code?: number) {
		try {
			await this.db.authUser(req);
			await this.routeSafely(res, fn, code);
		}
		catch (e) {
			next();
		}
	}
}
