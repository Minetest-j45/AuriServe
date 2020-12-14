import sass from 'sass';
import path from 'path';
import log4js from 'log4js';
import rimraf from 'rimraf';
import { promises as fs, constants as fsc } from 'fs';

import DBView from './DBView';
import { sanitizeIdentifier, SiteData, Database as DB } from 'auriserve-api';

const logger = log4js.getLogger();

export type Theme = DB.Theme;

export const OUT_DIR = '.public';

export default class ThemeParser {
	private watchers: any = [];
	private parsing: boolean = false;
	private enabledThemes: string[] = [];

	constructor(private dataPath: string, private db: DBView,
		private getSiteData: (specifier: string | undefined) => Promise<Partial<SiteData>>) {};

	async init() {
		try { await fs.access(path.join(this.dataPath, 'themes'), fsc.R_OK); }
		catch (e) { fs.mkdir(path.join(this.dataPath, 'themes')); }

		// Synchronize active themes representation with server.
		this.enabledThemes = await this.db.getEnabledThemes();

		// Reload list and parse themes.
		await this.refresh();
	}

	getEnabledThemes(): string[] {
		return this.enabledThemes;
	}

	async getLayouts(): Promise<{[key: string]: string}> {
		let layouts: {[key: string]: string} = {};

		let dirs: string[] = [];
		for (let theme of this.enabledThemes)
			dirs.push(path.join(theme, 'layout'));

		while (dirs.length > 0) {
			const dir = dirs.pop()!;

			await Promise.all((await fs.readdir(path.join(this.dataPath, 'themes', dir)))
				.map((file: string) => (async () => {
					
					const filePath = path.join(dir, file);
					const stat = await fs.lstat(path.join(this.dataPath, 'themes', filePath));

					if (stat.isDirectory()) dirs.push(filePath);
					else if (stat.isFile() && file.endsWith('.html')) {
						let fileContents = (await fs.readFile(path.join(this.dataPath, 'themes', filePath))).toString();
						layouts[path.basename(filePath, '.html')] = fileContents;
					}
				})())
			);
		}

		return layouts;
	}

	async parse() {
		if (this.parsing) return;
		this.parsing = true;

		const outPath = path.join(this.dataPath, 'themes', OUT_DIR);

		// Remove everything from themes/.public.
		await new Promise((res) => rimraf(outPath, res));
		await fs.mkdir(outPath);

		// Parse all active themes and add them to themes/.public.
		const enabledThemes = (await this.getSiteData('themes')).themes!.filter(t => this.enabledThemes.indexOf(t.identifier) !== -1);
		await Promise.all(enabledThemes.map(async t => {
			const themePath = path.join(this.dataPath, 'themes', t.identifier);

			return new Promise((resolve) => {
				sass.render({
					file: path.join(themePath, 'style', 'Main.sass')
				}, async (err: sass.SassException, result: sass.Result) => {
					if (err) logger.error(err);
					else await fs.writeFile(path.join(outPath, t.identifier + '.css'), result.css);
					resolve();
				});
			});
		}));

		logger.debug('Parsed %s theme%s.', enabledThemes.length, enabledThemes.length !== 1 ? 's' : '');

		this.parsing = false;
		this.watch();
	}

	async setEnabled(themes: string[]) {
		const realThemes = ((await this.getSiteData('themes')).themes || []).map(t => t.identifier);
		if (themes.filter(t => !realThemes.includes(t)).length > 0) throw 'Invalid themes specified.';

		this.enabledThemes = themes;

		await this.db.setEnabledThemes(this.enabledThemes);
		await this.parse();
	}

	async refresh() {
		let themes: Theme[] = [];
		let failedThemes = 0;

		const files = await fs.readdir(path.join(this.dataPath, 'themes'));

		await Promise.all(files.map(async f => {
			if (f.startsWith('.')) return;
			try {
				if (sanitizeIdentifier(f) !== f) throw `Failed to parse theme ${f}, theme directory must be lowercase alphanumeric.`;

				const confStr = (await fs.readFile(path.join(this.dataPath, 'themes', f, 'conf.json'))).toString();

				let conf: Theme;
				try { conf = JSON.parse(confStr); }
				catch (e) { throw `Failed to parse configuration file for theme ${f}.\n ${e}`; }

				let cover = true;
				try { await fs.access(path.join(this.dataPath, 'themes', f, 'cover.jpg'), fsc.R_OK); }
				catch (e) { cover = false; }

				themes.push({
					identifier: f,

					name: conf.name || f,
					description: conf.description || '',
					author: conf.author || 'Unauthored',

					pre: conf.pre || '',

					hasCover: cover
				});
			}
			catch (e) {
				if (typeof(e) === 'string') logger.warn(e);
				else if (e.code === 'ENOTDIR') logger.warn('Failed to load theme %s, not a directory.', f);
				else if (e.code === 'ENOENT') logger.warn('Failed to load theme %s, missing conf.json.', f);
				else logger.warn(e);

				failedThemes++;
			}
		}));

		await this.db.setThemes(themes);

		let log = 'Loaded ' + themes.length + ' theme' + (themes.length !== 1 ? 's' : '');
		if (failedThemes) log += ', failed to load ' + failedThemes + ' theme' + (failedThemes !== 1 ? 's' : '');
		else log += '.';
		logger.info(log);

		await this.parse();
	}

	private watch() {
		let watched = 0;
		const watch = require('recursive-watch') as any;

		this.watchers.forEach((w: any) => w());
		this.watchers = [];

		this.enabledThemes.forEach(identifier => {
			this.watchers.push(watch(path.join(this.dataPath, 'themes', identifier), () => this.parse()));
			watched ++;
		});

		logger.debug('Watching ' + watched + ' theme' + (watched !== 1 ? 's' : '') + '.');
	}
}
