import path from 'path';
import Express from 'express';
import { UploadedFile } from 'express-fileupload';

import Router from './Router';
import DBView from '../DBView';
import ThemeParser from '../ThemeParser';
import { MediaStatus } from '../Database';
import PagesManager from '../PagesManager';
import PluginParser from '../PluginParser';
import AuthRoute, { delay } from './AuthRoute';

import { sanitizeIdentifier, SiteData } from 'auriserve-api';

// For delaying responses, can be useful for many things.

export default class AdminRouter extends Router {
	constructor(private dataPath: string, private db: DBView, private app: Express.Application,
		private themes: ThemeParser, private plugins: PluginParser, private pages: PagesManager,
		private getSiteData: (specifier: string | undefined) => Promise<Partial<SiteData>>) { super(); }

	init() {
		const { rateLimit, authRoute } = AuthRoute({ db: this.db });

		/*
		 * Authentication Routes
		 */

		this.router.post('/auth', rateLimit, async (req, res) => {
			const start = Date.now();
			try {
				const user = req.body.user;
				const pass = req.body.pass;

				if (typeof user != 'string' || typeof pass != 'string')
					throw 'Request is missing required parameters.';
				
				res.send(await this.db.getAuthToken(user, pass));
			}
			catch (e) {
				await delay(1000, start);
				await delay(Math.random() * 150);
				res.status(403).send('Invalid username or password.');
			}
		});

		/*
		 * Data Routes
		 */

		this.router.get('/data/:specifier?', authRoute, Router.safeRoute(async (req, res) =>
			res.send(JSON.stringify(await this.getSiteData(req.params.specifier)))));

		/*
		 * Info Routes
		 */

		this.router.post('/info/update', authRoute, Router.safeRoute(async (req, res) => {
			if (typeof req.body !== 'object' || typeof req.body.sitename !== 'string' ||
				typeof req.body.domain !== 'string' || typeof req.body.description !== 'string')
				throw 'Request is missing required data.';
			
			await this.db.setInfo(req.body);
			res.send(JSON.stringify(await this.getSiteData('info')));
		}));

		/*
		 * Media Routes
		 */

		this.router.post('/media/upload', authRoute, Router.safeRoute(async (req, res) => {
			const user = await this.db.authUser(req);

			const file: UploadedFile = req.files?.file as UploadedFile;
			if (!file) throw 'Request is missing a file.';

			const name: string = req.body.name;
			const identifier: string = sanitizeIdentifier(req.body.identifier || req.body.name);

			if (typeof(name) != 'string' || typeof(identifier) != 'string')
				throw 'Request is missing required data.';

			let status = await this.db.acceptMedia(user, file, name, identifier);
			if (status !== MediaStatus.OK) res.status(409).send(status.toString());
			else res.status(202).send(status.toString());
		}));

		this.router.post('/media/replace', authRoute, Router.safeRoute(async (req, res) => {
			const user = await this.db.authUser(req);

			const file: UploadedFile = req.files?.file as UploadedFile;
			if (!file) throw 'Request is missing a file.';

			const replace: string = req.body.replace;

			if (typeof(replace) !== 'string')
				throw 'Request is missing required data.';

			let status = await this.db.replaceMedia(user, file, replace);
			if (status !== MediaStatus.OK) res.status(409).send(status.toString());
			else res.status(202).send(status.toString());
		}));

		this.router.post('/media/delete', authRoute, Router.safeRoute(async (req, res) => {
			// TODO: Sanitize the fuck out of this
			await this.db.deleteMedia(req.body);
			res.send(JSON.stringify(await this.getSiteData('media')));
		}));

		/*
		 * Theme Routes
		 */

		this.router.get('/themes/cover/:identifier.jpg', authRoute, Router.safeRoute(async (req, res) =>
			res.sendFile(path.join(this.dataPath, 'themes', req.params.identifier, 'cover.jpg'))));

		this.router.post('/themes/layout', authRoute, Router.safeRoute(async (req, res) => {
			if (typeof req.body.layout !== 'string') throw 'Request is missing required data.';
			const layouts = await this.themes.getLayouts();
			if (!layouts[req.body.layout]) throw 'Layout doesn\'t exist';
			res.send(layouts[req.body.layout]);
		}));

		this.router.post('/themes/refresh', authRoute, Router.safeRoute(async (_, res) => {
			await this.themes.refresh();
			res.send(JSON.stringify(await this.getSiteData('themes&info')));
		}));

		this.router.post('/themes/update', authRoute, Router.safeRoute(async (req, res) => {
			if (!Array.isArray(req.body)) throw 'Request is missing required data.';
			
			await this.themes.setEnabled(req.body);
			res.send(JSON.stringify(await this.getSiteData('info')));
		}));

		/*
		 * Plugin Routes
		 */

		this.router.get('/plugins/cover/:identifier.jpg', authRoute, Router.safeRoute((req, res) =>
			res.sendFile(path.join(this.dataPath, 'plugins', req.params.identifier, 'cover.jpg'))));

		this.router.post('/plugins/refresh', authRoute, async (_, res) => {
			await this.plugins.refresh();
			res.send(JSON.stringify(await this.getSiteData('plugins&info')));
		});

		this.router.post('/plugins/update', authRoute, Router.safeRoute(async (req, res) => {
			if (!Array.isArray(req.body)) throw 'Request is missing required data.';
			
			await this.plugins.setEnabled(req.body);
			res.send(JSON.stringify(await this.getSiteData('info')));
		}));

		/*
		 * Page Routes
		 */

		this.router.post('/pages/data', authRoute, Router.safeRoute(async (req, res) => {
			if (typeof req.body !== 'object' || typeof req.body.page !== 'string')
				throw 'Request is missing required data.';

			const data = await this.pages.getPreparedPage(req.body.page);
			res.send(JSON.stringify(data));
		}));

		this.router.post('/pages/update', authRoute, Router.safeRoute(async (req, res) => {
			if (typeof req.body !== 'object' || typeof req.body.path !== 'string' || typeof req.body.body !== 'object')
				throw 'Request is missing required data.';

			await this.pages.updatePage(req.body.path, req.body.body);
			res.sendStatus(200);
		}));

		/*
		 * Role Routes
		 */

		this.router.post('/roles/update', authRoute, Router.safeRoute(async (req, res) => {
			if (typeof req.body !== 'object')
				throw 'Request is missing required data.';

			await this.db.updateRoles(req.body);
			res.send(JSON.stringify(await this.getSiteData('roles')));
		}));

		/*
		 * User Routes
		 */

		this.router.post('/users/role/add', authRoute, Router.safeRoute(async (req, res) => {
			if (typeof req.body !== 'object' || typeof req.body.user !== 'string' || typeof req.body.role !== 'string')
				throw 'Request is missing required data.';
			await this.db.userAddRoles(req.body.user, req.body.role.split(','));
			res.send(JSON.stringify(await this.getSiteData('users')));
		}));

		this.router.post('/users/role/remove', authRoute, Router.safeRoute(async (req, res) => {
			if (typeof req.body !== 'object' || typeof req.body.user !== 'string' || typeof req.body.role !== 'string')
				throw 'Request is missing required data.';
			await this.db.userRemoveRoles(req.body.user, req.body.role.split(','));
			res.send(JSON.stringify(await this.getSiteData('users')));
		}));

		/*
		 * Basic App Content
		 */

		this.router.use('/script', Express.static(path.join(path.dirname(__dirname), '../../admin/build')));
		this.router.use('/asset', Express.static(path.join(path.dirname(__dirname), '../../admin/res')));

		this.router.get('(/*)?', async (_, res) => res.render(path.join(path.dirname(__dirname), '../views/admin'), {
			themes: this.themes.getEnabledThemes(),
			scripts: this.plugins.getEnabledPlugins().filter(p => p.conf.sources.editor?.script)
				.map(p => p.conf.identifier + '/' + p.conf.sources.editor!.script),
			styles: this.plugins.getEnabledPlugins().filter(p => p.conf.sources.editor?.style)
				.map(p => p.conf.identifier + '/' + p.conf.sources.editor!.style)
		}));

		this.app.use('/admin', this.router);
	}
}
