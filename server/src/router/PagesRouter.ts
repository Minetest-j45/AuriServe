import path from 'path';
import log4js from 'log4js';
import Express from 'express';

import Router from './Router';
import PluginParser from '../PluginParser';
import PagesManager from '../PagesManager';

const logger = log4js.getLogger();

export default class PagesRouter extends Router {

	constructor(private dataPath: string, private app: Express.Application,
		private pages: PagesManager, private plugins: PluginParser) { super(); }

	init() {
		this.router.use('/media', Express.static(path.join(this.dataPath, 'media')));
		this.router.use('/theme', Express.static(path.join(this.dataPath, 'themes', 'public')));

		this.router.use('/plugin/:identifier/:file', async (req, res, next) => {
			try {
				let plugins = this.plugins.getEnabledPlugins().filter(p => p.conf.identifier === req.params.identifier);
				if (plugins.length === 0) throw `There is no loaded plugin with identifier ${req.params.identifier}.`;
				Express.static(path.join(this.dataPath, 'plugins', req.params.identifier,
					plugins[0].conf.sourceRoot, req.params.file))(req, res, next);
			}
			catch (e) {
				res.status(403).send(e);
			}
		});

		this.router.get('/plugin/styles/:identifier.css', (req, res) => {
			const plugins = this.plugins.getEnabledPlugins().filter(p => p.conf.identifier === req.params.identifier);
			if (plugins.length !== 1) { res.sendStatus(404); return; }
			const plugin = plugins[0];

			if (!plugin.conf.sources.style) { res.sendStatus(404); return; }
			res.sendFile(path.join(this.dataPath, 'plugins', plugin.conf.identifier, plugin.conf.sources.style));
		});

		this.router.get('*', (req, res, next) => {
			this.resolvePage(req, res, next);
		});

		this.app.use(this.router);
	}

	private async resolvePage(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
		try {
			res.send(await this.pages.renderPage(req.params[0]));
		}
		catch (e) {
			if (typeof(e) === 'number') res.sendStatus(e);
			else if (e.code !== 'ENOENT') logger.error('Encountered an error assembling file %s.\n %s', req.params[0], e);
			else next();
		}
	}

	// private debugRoutes() {
	// 	this.app.get('*', (req, _, next) => {
	// 		logger.debug('GET %s', req.params[0]);
	// 		next();
	// 	});

	// 	this.app.post('*', (req, _, next) => {
	// 		logger.debug('POST %s', req.params[0]);
	// 		next();
	// 	});
	// }
}
