import path from "path";
import log4js from "log4js";
import { promises as fs } from "fs";

import Server from "./Server";
import PluginBindings from "./PluginBindings";

import sanitize from "../../common/util/Sanitize";

const logger = log4js.getLogger();

interface PluginConfig {
	identifier: string;
	name: string,
	author: string,
	description: string
}

class Plugin {
	public bindings?: PluginBindings;
	constructor(private server: Server, public conf: PluginConfig, public init: (p: PluginBindings) => void) {};

	attach(): void {
		this.server.pages.elements.addList(this.bindings!.elements);
	}

	detach(): void {
		this.server.pages.elements.removeList(this.bindings!.elements);
	}
}

export default class PluginParser {
	private plugins: Plugin[] = [];

	constructor(private server: Server) {}

	async init() {
		await this.refresh();
	}

	private async initPlugins() {
		let succeeded = 0;
		let failed = 0;
		
		for (let plugin of this.plugins) {
			try {
				plugin.bindings = new PluginBindings(this.server, plugin.conf.identifier);
				await plugin.init(plugin.bindings);
				plugin.attach();
				succeeded++;
			}
			catch (e) {
				logger.error("Failed to initialize plugin %s.\n %s", plugin.conf.identifier, e);
				plugin.bindings = undefined;
				failed++;
			}
		}

		let log = "Initialized " + succeeded + " plugin" + (succeeded != 1 ? "s" : "");
		if (failed) log += ", failed to initialize " + failed + " plugin" + (failed != 1 ? "s" : "");
		logger.info(log + ".");
	}

	private async destroyPlugins() {
		let succeeded = 0;
		let failed = 0;
		
		for (let plugin of this.plugins) {
			try {
				if (!plugin.bindings) throw "Plugin was not Initialized.";
				plugin.detach();
				succeeded++;
			}
			catch (e) {
				logger.error("Failed to destroy plugin %s.\n %s", plugin.conf.identifier, e);
				failed++;
			}
		}

		let log = "Destroyed " + succeeded + " plugin" + (succeeded != 1 ? "s" : "");
		if (failed) log += ", failed to destroy " + failed + " plugin" + (failed != 1 ? "s" : "");
		if (succeeded != 0 || failed != 0) logger.info(log + ".");
	}

	private async testPlugin(identifier: string): Promise<boolean | string> {
		if (sanitize(identifier) != identifier) throw `Plugin ${identifier} must be lowercase alphanumeric.`;
		const p = path.join(this.server.dataPath, "plugins", identifier);
		
		try {
			await fs.access(path.join(p, "conf.json"));
			await fs.access(path.join(p, "src"));

			const s1 = await fs.stat(p);
			if (!s1.isDirectory()) return "Plugin is not a directory.";

			const s2 = await fs.stat(path.join(p, "src", "index.js"));
			if (!s2.isFile()) throw "Missing index";
		}
		catch (e) {
			return "Plugin is missing required files.";
		}

		return true;
	}

	async refresh() {
		await this.destroyPlugins();
		this.plugins = [];

		const dirs = await fs.readdir(path.join(this.server.dataPath, "plugins"));

		await Promise.all(dirs.map(async identifier => {
			const test = await this.testPlugin(identifier);
			if (test !== true) return;

			try {
				const p = path.join(this.server.dataPath, "plugins", identifier);
				const init = require(path.join(p, "src", "index.js"));
				
				const confStr = (await fs.readFile(path.join(p, "conf.json"))).toString();
				let conf: PluginConfig;
				try { conf = JSON.parse(confStr); }
				catch (e) { throw `Failed to configuration file for plugin ${identifier}.\n ${e}`; }
				conf.identifier = identifier;

				const plugin = new Plugin(this.server, conf, init);
				this.plugins.push(plugin);
			}
			catch (e) {
				logger.error(e);
			}
		}));

		await this.initPlugins();
	}

	async toggle(plugins: string[]) {
		console.log(plugins);
		// // Prune invalid active themes.
		// const existing = (await this.db.getSiteData()).themes!.map(t => t.identifier);
		// this.activeThemes = this.activeThemes.filter(t => existing.indexOf(t) != -1);

		// // Toggle themes.
		// for (let theme of themes) {
		// 	if (this.activeThemes.indexOf(theme) != -1) this.activeThemes.splice(this.activeThemes.indexOf(theme), 1);
		// 	else if (existing.indexOf(theme) != -1) this.activeThemes.push(theme);
		// }

		// await this.db.setActiveThemes(this.activeThemes);
		// await this.parse();
	}
}
