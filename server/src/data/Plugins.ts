import path from 'path';
import log4js from 'log4js';
import { sanitizeIdentifier } from 'auriserve-api';
import { promises as fs, constants as fsc } from 'fs';

import Elements from '../Elements';
import Plugin from './plugin/Plugin';
import PluginConfig from './plugin/PluginConfig';

import Properties from './model/Properties';

import Preact from 'preact';
import Hooks from 'preact/hooks';

/** @ts-ignore Globals to avoid duplicate Preact instances. */
global._AS_ = {
	preact: Preact,
	preact_hooks: Hooks
};

const logger = log4js.getLogger();


/**
 * Manages plugins and plugin states.
 */

export default class Plugins {
	private plugins: Map<string, Plugin> = new Map();

	constructor(private dataPath: string, private elements: Elements) {
		// Create themes directory if it doesn't exist.
		fs.access(path.join(this.dataPath, 'plugins'), fsc.R_OK).catch(
			_ => fs.mkdir(path.join(this.dataPath, 'plugins')));
	};


	/**
	 * Loads plugins from the filesystem and
	 * enables those which were previously enabled.
	 */

	async init() {
		await this.refresh();
		((await Properties.findOne())?.enabled.plugins ?? []).forEach(p => this.enable(p));
		this.syncToDb();
	}


	/**
	 * Enables a plugin with the identifier provided.
	 *
	 * @param {string} identifier - The plugin identifier.
	 */

	enable(identifier: string) {
		this.plugins.get(identifier)?.enable();
	}


	/**
	 * Disables a plugin with the identifier provided.
	 *
	 * @param {string} identifier - The plugin identifier.
	 */

	disable(identifier: string) {
		this.plugins.get(identifier)?.disable();
	}


	/**
	 * Returns a list of enabled plugins.
	 */

	listEnabled() {
		return [ ...this.plugins.values() ].filter(p => p.isEnabled());
	}


	/**
	 * Returns a list of all plugins.
	 */

	listAll() {
		return [ ...this.plugins.values() ];
	}


	/**
	 * Disables all plugins, and refreshes the plugin listings from the plugins directory.
	 */

	async refresh() {
		this.plugins.forEach(p => p.disable());
		this.plugins.clear();

		const pluginDirs = await fs.readdir(path.join(this.dataPath, 'plugins'));
		await Promise.all(pluginDirs.map(async dirName => {
			try {
				const config = await this.validate(dirName);
				this.plugins.set(config.identifier, new Plugin(config, require.resolve(path.join(this.dataPath,
					'plugins', dirName, config.sourceRoot, config.sources.server.script!)), this.elements));
			}
			catch (e) {
				logger.error('Encountered an error parsing plugin %s:\n %s', dirName, e);
			}
		}));
	}


	/**
	 * Saves the current list of enabled plugins to
	 * the database, and shuts down all plugins.
	 */

	async cleanup() {
		await this.syncToDb();
		this.plugins.forEach(p => p.disable());
	}


	/**
	 * Saves the current list of enabled plugins to the database.
	 */

	private async syncToDb() {
		await Properties.updateOne({}, { $set: { 'enabled.plugins': [ ...this.plugins.values() ]
			.filter(p => p.isEnabled()).map(p => p.config.identifier) } });
	}


	/**
	 * Validates a plugin directory, and returns the plugin config.
	 * Throws if the plugin is ill-formed.
	 *
	 * @param {string} identifier - The identifier (file name) of the plugin.
	 * @returns a configuration object for the plugin.
	 */

	private async validate(identifier: string): Promise<PluginConfig> {

		// Ensure that the plugin is structured properly.
		if (sanitizeIdentifier(identifier) !== identifier)
			throw 'Plugin identifier must be lowercase alphanumeric.';
		const dir = path.join(this.dataPath, 'plugins', identifier);
		
		if (!(await fs.stat(dir)).isDirectory()) throw 'Plugin is not a directory.';

		try { await fs.access(path.join(dir, 'plugin.json')); }
		catch (e) { throw 'plugin.json not found in plugin root directory.'; }

		// Create the configuration file.
		let config: PluginConfig;
		try { config = JSON.parse((await fs.readFile(path.join(dir, 'plugin.json'))).toString()); }
		catch (e) { throw 'Failed to parse configuration file:\n ' + e; }
		config.identifier = identifier;

		if (!config.sources || !config.sources.server) throw 'Plugin configuration is missing sources.server.';

		for (let root of Object.keys(config.sources)) {
			try { await fs.access(path.join(dir, config.sourceRoot, (config.sources as any)[root].script ?? '___')); }
			catch (e) { throw `${root} source file '${config.sourceRoot}/${(config.sources as any)[root]}' not found.`; }
		}

		return config;
	}
}
