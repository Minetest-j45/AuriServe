import path from "path";
import log4js from "log4js";
import decache from "decache";
import ff, { promises as fs, constants as fsc } from "fs";

import Server from "./Server";
import PluginBindings from "./PluginBindings";

import sanitize from "../../common/util/Sanitize";
import { Plugin as DBPlugin } from "../../common/interface/DBStructs";

const logger = log4js.getLogger();

interface PluginConfig {
	identifier: string

	name: string
	author: string
	description: string

	sourceRoot: string
	sources: {
		server: string
		client?: string
		admin?: string
		style?: string
	}
}

class Plugin {
	public bindings?: PluginBindings;
	constructor(private server: Server, public conf: PluginConfig, private init: (p: PluginBindings) => void) {};

	async attach() {
		await this.init(this.bindings!);
		this.server.elements.addList(this.bindings!.elements);
	}

	async detach() {
		this.server.elements.removeList(this.bindings!.elements);
	}
}

export default class PluginParser {
	private watchers: ff.FSWatcher[] = [];
	private enabledPlugins: string[] = [];
	private plugins: Plugin[] = [];

	constructor(private server: Server) {}

	async init() {
		// Synchronize active themes representation with server.
		this.enabledPlugins = await this.server.db.getEnabledPlugins();
		
		// Reload themes list and parse themes.
		await this.refresh();
		
		// Force clearing of invalid themes.
		await this.toggle([]);
	}


	/**
	* Returns an array of all of the active plugins.
	*/

	getEnabledPlugins(): Plugin[] {
		return this.plugins.filter(p => this.enabledPlugins.includes(p.conf.identifier));
	}


	/**
	* Attaches all enabled plugins, 
	* and then compiles them.
	*/

	private async attach() {
		let succeeded = 0;
		let failed = 0;
		
		await Promise.all(this.enabledPlugins.map(async (identifier) => {
			const plugin = this.plugins.filter(p => p.conf.identifier == identifier)[0];

			try {
				if (!plugin) throw "Plugin doesn't exist.";

				plugin.bindings = new PluginBindings(this.server, plugin.conf.identifier);
				await plugin.attach();
				succeeded++;
			}
			catch (e) {
				logger.error("Failed to attach plugin %s.\n %s", plugin?.conf?.identifier, e);
				if (plugin) plugin.bindings = undefined;
				failed++;
			}
		}))

		let log = "Attached " + succeeded + " plugin" + (succeeded != 1 ? "s" : "");
		if (failed) log += ", failed to attach " + failed + " plugin" + (failed != 1 ? "s" : "");
		logger.info(log + ".");

		this.watch();
	}


	/**
	* Detaches all enabled plugins and 
	* cleans up their registered data.
	*/

	private async detach() {
		let succeeded = 0;
		let failed = 0;
		
		await Promise.all(this.enabledPlugins.map(async (identifier) => {
			const plugin = this.plugins.filter(p => p.conf.identifier == identifier)[0];

			try {
				if (!plugin) return;
				if (!plugin.bindings) throw "Plugin was not attached.";
				await plugin.detach();
				succeeded++;
			}
			catch (e) {
				logger.error("Failed to destroy plugin %s.\n %s", plugin.conf.identifier, e);
				failed++;
			}
		}));

		let log = "Detached " + succeeded + " plugin" + (succeeded != 1 ? "s" : "");
		if (failed) log += ", failed to detache " + failed + " plugin" + (failed != 1 ? "s" : "");
		logger.info(log + ".");
	}


	/**
	* Watch enabled plugins for source changes.
	*/

	private watch() {
		let watched = 0;

		this.watchers.forEach(w => w.close());
		this.watchers = [];

		this.enabledPlugins.forEach(identifier => {
			const plugin = this.plugins.filter(p => p.conf.identifier == identifier)[0];
			if (!plugin || !plugin.bindings) return;

			this.watchers.push(ff.watch(path.join(this.server.dataPath, "plugins", 
				plugin.conf.identifier, plugin.conf.sourceRoot, plugin.conf.sources.server), 
				{ persistent: false, recursive: false, encoding: 'utf8'}, () => this.refresh()));

			watched ++;
		});

		logger.debug("Watching " + watched + " plugin" + (watched != 1 ? "s" : "") + ".");
	}


	/**
	* Detaches all enabled plugins, refreshes the plugins array from the 
	* plugins directory, and then attaches all enabled plugins.
	*/

	async refresh() {
		await this.detach();
		this.plugins = [];
		
		let pluginData: DBPlugin[] = [];

		const dirs = await fs.readdir(path.join(this.server.dataPath, "plugins"));
		await Promise.all(dirs.map(async identifier => {
			if (identifier == "public") return;
			try {

				// Validate basic plugin file structure.

				if (sanitize(identifier) != identifier) throw `Plugin identifier must be lowercase alphanumeric.`;
				const p = path.join(this.server.dataPath, "plugins", identifier);

				const stat = await fs.stat(p);
				if (!stat.isDirectory()) throw "Plugin is not a directory.";
				
				try { await fs.access(path.join(p, "plugin.json")) }
				catch (e) { throw "plugin.json not found in plugin root directory."; }

				// Parse and validate config.

				const confStr = (await fs.readFile(path.join(p, "plugin.json"))).toString();
				
				let conf: PluginConfig;
				try { conf = JSON.parse(confStr); }
				catch (e) { throw "Failed to parse configuration file:\n " + e; }

				if (!conf.sources || !conf.sources.server) throw "Plugin configuration is missing sources.server.";

				try { await fs.access(path.join(p, conf.sourceRoot, conf.sources.server)) }
				catch (e) { throw `Server source file '${conf.sourceRoot}/${conf.sources.server}' not found.`; }

				if (conf.sources.client) {
					try { await fs.access(path.join(p, conf.sourceRoot, conf.sources.client)) }
					catch (e) { throw `Client source file '${conf.sourceRoot}/${conf.sources.client}' not found.`; }
				}

				if (conf.sources.admin) {
					try { await fs.access(path.join(p, conf.sourceRoot, conf.sources.admin)) }
					catch (e) { throw `Admin source file '${conf.sourceRoot}/${conf.sources.admin}' not found.`; }
				}
				
				// Add extra details to config.

				conf.identifier = identifier;

				// Create a DB.Plugin for the database.

				let cover = true;
				try { await fs.access(path.join(this.server.db.dataPath, "plugins", identifier, "cover.jpg"), fsc.R_OK); }
				catch (e) { cover = false; }

				pluginData.push({
					identifier: identifier,

					name: conf.name || identifier,
					description: conf.description || "",
					author: conf.author || "Unauthored",

					hasCover: cover
				});

				// Create Plugin object and add it to the plugins array.

				let requirePath = require.resolve(path.join(p, conf.sourceRoot, conf.sources.server));
				decache(requirePath);
				const plugin = new Plugin(this.server, conf, require(requirePath));
				this.plugins.push(plugin);
			}
			catch (e) {
				logger.error("Encountered an error parsing plugin %s:\n %s", identifier, e);
			}
		}));

		await this.server.db.setPlugins(pluginData);
		await this.attach();
	}


	/**
	* Toggles the state of a list of plugins, and then detaches and attaches all enabled plugins.
	*
	* @param {string[]} identifiers - Plugins to toggle the state of.
	*/

	async toggle(plugins: string[]) {
		await this.detach();

		// Prune invalid enabled plugins.
		const existing = this.plugins.map(p => p.conf.identifier);
		this.enabledPlugins = this.enabledPlugins.filter(p => existing.indexOf(p) != -1);

		// Toggle Plugins
		for (let plugin of plugins) {
			if (this.enabledPlugins.indexOf(plugin) != -1) this.enabledPlugins.splice(this.enabledPlugins.indexOf(plugin), 1);
			else if (existing.indexOf(plugin) != -1) this.enabledPlugins.push(plugin);
		}

		await this.server.db.setEnabledPlugins(this.enabledPlugins);

		await this.attach();
	}
}
