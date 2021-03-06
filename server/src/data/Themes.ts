import path from 'path';
import log4js from 'log4js';
import { sanitizeIdentifier } from 'auriserve-api';
import { promises as fs, constants as fsc } from 'fs';

import Theme from './theme/Theme';
import ThemeConfig from './theme/ThemeConfig';

import Properties from './model/Properties';

const logger = log4js.getLogger();

export const OUT_DIR = '.public';

/**
 * Manages themes and theme states.
 */

export default class Themes {
	private themes: Map<string, Theme> = new Map();

	constructor(private dataPath: string) {
		// Create themes directory if it doesn't exist.
		fs.access(path.join(this.dataPath, 'themes'), fsc.R_OK).catch(
			_ => fs.mkdir(path.join(this.dataPath, 'themes')));
		// Create themes out directory if it doesn't exist.
		fs.access(path.join(this.dataPath, 'themes', OUT_DIR), fsc.R_OK).catch(
			_ => fs.mkdir(path.join(this.dataPath, 'themes', OUT_DIR)));
	};


	/**
	 * Loads themes from the filesystem and
	 * enables those which were previously enabled.
	 */

	async init() {
		await this.refresh();
		((await Properties.findOne())?.enabled.themes ?? []).forEach(t => this.enable(t));
		this.syncToDb();
	}


	/**
	 * Enables a theme with the identifier provided.
	 *
	 * @param {string} identifier - The theme identifier.
	 */

	enable(identifier: string) {
		this.themes.get(identifier)?.enable();
	}


	/**
	 * Disables a theme with the identifier provided.
	 *
	 * @param {string} identifier - The theme identifier.
	 */

	disable(identifier: string) {
		this.themes.get(identifier)?.disable();
	}


	/**
	 * Returns a list of enabled themes.
	 */

	listEnabled() {
		return [ ...this.themes.values() ].filter(t => t.isEnabled());
	}


	/**
	 * Returns a list of all themes.
	 */

	listAll() {
		return [ ...this.themes.values() ];
	}


	/**
	 * Lists all enabled layouts.
	 */

	listLayouts() {
		const layouts = new Map<string, string>();
		[ ...this.themes.values() ].filter(t => t.isEnabled()).forEach(t => t.getLayouts().forEach((v, k) => layouts.set(k, v)));
		return layouts;
	}


	/**
	 * Disables all themes, and refreshes the theme listings from the themes directory.
	 */

	async refresh() {
		this.themes.forEach(t => t.disable());
		this.themes.clear();

		const themeDirs = await fs.readdir(path.join(this.dataPath, 'themes'));
		await Promise.all(themeDirs.map(async dirName => {
			if (dirName === OUT_DIR) return;
			try {
				const config = await this.validate(dirName);
				this.themes.set(config.identifier, new Theme(config, this.dataPath));
			}
			catch (e) {
				logger.error('Encountered an error parsing theme %s:\n %s', dirName, e);
			}
		}));
	}


	/**
	 * Saves the current list of enabled plugins to
	 * the database, and shuts down all plugins.
	 */

	async cleanup() {
		await this.syncToDb();
		this.themes.forEach(t => t.disable());
	}


	/**
	 * Saves the current list of enabled themes to the database.
	 */

	private async syncToDb() {
		await Properties.updateOne({}, { $set: { 'enabled.themes': [ ...this.themes.values() ]
			.filter(t => t.isEnabled()).map(t => t.config.identifier) } });
	}


	/**
	 * Validates a theme directory, and returns the theme's config.
	 * Throws if the theme is ill-formed.
	 *
	 * @param {string} identifier - The identifier (file name) of the theme.
	 * @returns a configuration object for the theme.
	 */

	private async validate(identifier: string): Promise<ThemeConfig> {

		// Ensure that the theme is structured properly.
		if (sanitizeIdentifier(identifier) !== identifier)
			throw 'Theme identifier must be lowercase alphanumeric.';
		const dir = path.join(this.dataPath, 'themes', identifier);

		if (!(await fs.stat(dir)).isDirectory()) throw 'Theme is not a directory.';

		try { await fs.access(path.join(dir, 'conf.json')); }
		catch (e) { throw 'conf.json not found in theme root directory.'; }

		// Create the configuration file.
		let config: ThemeConfig;
		try { config = JSON.parse((await fs.readFile(path.join(dir, 'conf.json'))).toString()); }
		catch (e) { throw 'Failed to parse configuration file:\n ' + e; }
		config.identifier = identifier;

		if (config.preprocessor !== 'sass' && config.preprocessor !== '')
			throw 'Preprocessor is not valid.';

		return config;
	}
}
