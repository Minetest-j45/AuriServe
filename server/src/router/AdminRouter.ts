import path from 'path';
import Express from 'express';
import { UploadedFile } from 'express-fileupload';

import Router from './Router';
import DBView from '../DBView';
import ThemeParser from '../ThemeParser';
import { MediaStatus } from '../Database';
import PagesManager from '../PagesManager';
import PluginParser from '../PluginParser';

import sanitize from '../../../common/util/Sanitize';
import { SiteData } from '../../../common/interface/SiteData';

export default class AdminRouter extends Router {
	authenticated: Express.Router = Express.Router();

	constructor(private dataPath: string, private db: DBView, private app: Express.Application,
		private themes: ThemeParser, private plugins: PluginParser, private pages: PagesManager,
		private getSiteData: (specifier: string | undefined) => Promise<Partial<SiteData>>) { super(); }

	init() {
		/*
		* Authentication Routes
		*/

		this.router.post('/auth',
			this.safeRoute(async (req: Express.Request, res: Express.Response) => {
				const user = req.body.user;
				const pass = req.body.pass;

				if (typeof user != 'string' || typeof pass != 'string')
					throw 'Request is missing required parameters.';

				res.send(await this.db.getAuthToken(user, pass));
			})
		);

		/*
		* Data Routes
		*/

		this.router.get('/data/:specifier?',
			this.authRoute(async (req: Express.Request, res: Express.Response) => {
				res.send(JSON.stringify(await this.getSiteData(req.params.specifier)));
			})
		);

		/*
		* Media Routes
		*/

		this.router.post('/media/upload',
			this.authRoute(async (req: Express.Request, res: Express.Response) => {
				const user = await this.db.authUser(req);

				const file: UploadedFile = req.files?.file as UploadedFile;
				if (!file) throw 'Request is missing a file.';

				const name: string = req.body.name;
				const identifier: string = sanitize(req.body.identifier || req.body.name);

				if (typeof(name) != 'string' || typeof(identifier) != 'string')
					throw 'Request is missing required data.';

				let status = await this.db.acceptMedia(user, file, name, identifier);
				if (status !== MediaStatus.OK) res.status(409).send(status.toString());
				else res.status(202).send(status.toString());
			})
		);

		this.router.post('/media/replace',
			this.authRoute(async (req: Express.Request, res: Express.Response) => {
				const user = await this.db.authUser(req);

				const file: UploadedFile = req.files?.file as UploadedFile;
				if (!file) throw 'Request is missing a file.';

				const replace: string = req.body.replace;

				if (typeof(replace) !== 'string')
					throw 'Request is missing required data.';

				let status = await this.db.replaceMedia(user, file, replace);
				if (status !== MediaStatus.OK) res.status(409).send(status.toString());
				else res.status(202).send(status.toString());
			})
		);

		this.router.post('/media/delete',
			this.authRoute(async (req: Express.Request, res: Express.Response) => {
				// TODO: Sanitize the fuck out of this
				await this.db.deleteMedia(req.body);
				res.send(JSON.stringify(await this.getSiteData('media')));
			})
		);

		/*
		* Theme Routes
		*/

		this.router.get('/themes/cover/:identifier.jpg',
			this.authRoute(async (req: Express.Request, res: Express.Response) => {
				res.sendFile(path.join(this.dataPath, 'themes', req.params.identifier, 'cover.jpg'));
			})
		);

		this.router.post('/themes/refresh',
			this.authRoute(async (_: any, res: Express.Response) => {
				await this.themes.refresh();
				res.send(JSON.stringify(await this.getSiteData('themes&info')));
			})
		);

		this.router.post('/themes/toggle',
			this.authRoute(async (req: Express.Request, res: Express.Response) => {
				// TODO: Santiize the fuck outa this too
				await this.themes.toggle(req.body);
				res.send(JSON.stringify(await this.getSiteData('info')));
			})
		);

		/*
		* Plugin Routes
		*/

		this.router.get('/plugins/cover/:identifier.jpg',
			this.authRoute(async (req: Express.Request, res: Express.Response) => {
				res.sendFile(path.join(this.dataPath, 'plugins', req.params.identifier, 'cover.jpg'));
			})
		);

		this.router.post('/plugins/refresh',
			this.authRoute(async (_: any, res: Express.Response) => {
				await this.plugins.refresh();
				res.send(JSON.stringify(await this.getSiteData('plugins&info')));
			})
		);

		this.router.post('/plugins/toggle',
			this.authRoute(async (req: Express.Request, res: Express.Response) => {
				await this.plugins.toggle(req.body);
				res.send(JSON.stringify(await this.getSiteData('info')));
			})
		);

		/*
		* Page Routes
		*/

		this.router.post('/pages/data',
			this.authRoute(async (req: Express.Request, res: Express.Response) => {
				if (!req.body.page || typeof(req.body.page) !== 'string')
					throw 'Request is missing required data.';

				const data = await this.pages.getExpandedPage(req.body.page);
				res.send(JSON.stringify(data));
			})
		);

		this.router.post('/pages/update',
			this.authRoute(async (req: Express.Request, res: Express.Response) => {
				if (!req.body.path || typeof req.body.path !== 'string' || !req.body.body || typeof req.body.body !== 'object')
					throw 'Request is missing required data.';

				await this.pages.updatePage(req.body.path, req.body.body);
				res.sendStatus(200);
			})
		);

		/*
		* Basic App Content
		*/

		this.router.use('/asset', Express.static(path.join(path.dirname(__dirname), '../../admin/res')));
		this.router.use('/script', Express.static(path.join(path.dirname(__dirname), '../../admin/build')));

		this.router.get('(/*)?', async (_, res) => res.render(path.join(path.dirname(__dirname), '../views/admin'), {
			scripts: this.plugins.getEnabledPlugins().filter(p => p.conf.sources.admin).map(p => p.conf.identifier + '/' + p.conf.sources.admin),
			styles: this.plugins.getEnabledPlugins().filter(p => p.conf.sources.style).map(p => p.conf.identifier + '/' + p.conf.sources.style)
		}));

		this.app.use('/admin', this.router);
	}

	protected authRoute(fn: (req: Express.Request, res: Express.Response, next: Express.NextFunction) => any, code?: number) {
		return async (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
			try {
				await this.db.authUser(req);
				await this.safeRoute(fn, code)(req, res, next);
			}
			catch (e) {
				next();
			}
		};
	}
}
