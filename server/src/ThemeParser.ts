import path from "path";
import log4js from "log4js";
import rimraf from "rimraf";
import sass from "node-sass";
import { promises as fs, constants as fsc } from "fs";

import sanitize from "../../common/util/Sanitize";
import { Theme as DBTheme } from "../../common/interface/DBStructs";

import Server from "./Server";

const logger = log4js.getLogger();

export type Theme = DBTheme;

export default class ThemeParser {
	private watchers: any = [];
	private parsing: boolean = false;
	private enabledThemes: string[] = [];

	constructor(private server: Server) {};

	async init() {
		// Synchronize active themes representation with server.
		this.enabledThemes = await this.server.db.getEnabledThemes();
		
		// Reload themes list and parse themes.
		await this.refresh();
		
		// Force clearing of invalid themes.
		await this.toggle([]);
	}

	getEnabledThemes(): string[] {
		return this.enabledThemes;
	}

	async parse() {
		if (this.parsing) return;
		this.parsing = true;

		const outPath = path.join(this.server.db.dataPath, "themes", "public");

		// Remove everything from themes/public.
		await new Promise((res) => rimraf(outPath, res));
		await fs.mkdir(outPath);

		// Parse all active themes and add them to themes/public.
		const enabledThemes = (await this.server.getSiteData()).themes!.filter(t => this.enabledThemes.indexOf(t.identifier) != -1);
		await Promise.all(enabledThemes.map(async (t) => {
			const themePath = path.join(this.server.db.dataPath, "themes", t.identifier);

			return new Promise((resolve) => {
				sass.render({
					file: path.join(themePath, "style", "Main.sass")
				}, async (err: sass.SassError, result: sass.Result) => {
					if (err) logger.error(err);
					else await fs.writeFile(path.join(outPath, t.identifier + ".css"), result.css);
					resolve();
				});
			});
		}));

		logger.info("Parsed %s theme%s.", enabledThemes.length, enabledThemes.length != 1 ? "s" : "");

		this.parsing = false;
		this.watch();
	}

	private watch() {
		let watched = 0;
		const watch = require("recursive-watch") as any;

		this.watchers.forEach((w: any) => w());
		this.watchers = [];

		this.enabledThemes.forEach(identifier => {
			this.watchers.push(watch(path.join(this.server.db.dataPath, "themes", identifier), () => this.parse()));
			watched ++;
		});

		logger.debug("Watching " + watched + " theme" + (watched != 1 ? "s" : "") + ".");
	}
	
	async refresh() {
		let themes: Theme[] = [];
		let failedThemes = 0;

		const files = await fs.readdir(path.join(this.server.db.dataPath, "themes"));

		await Promise.all(files.map(async f => {
			if (f == "public") return;
			try {
				if (sanitize(f) != f) throw `Failed to parse theme ${f}, theme directory must be lowercase alphanumeric.`;

				const confStr = (await fs.readFile(path.join(this.server.db.dataPath, "themes", f, "conf.json"))).toString();
				
				let conf: Theme;
				try { conf = JSON.parse(confStr); }
				catch (e) { throw `Failed to parse configuration file for theme ${f}.\n ${e}`; }

				let cover = true;
				try { await fs.access(path.join(this.server.db.dataPath, "themes", f, "cover.jpg"), fsc.R_OK); }
				catch (e) { cover = false; }

				themes.push({
					identifier: f,

					name: conf.name || f,
					description: conf.description || "",
					author: conf.author || "Unauthored",
					
					pre: conf.pre || "",

					hasCover: cover
				});
			}
			catch (e) {
				if (typeof(e) == "string") logger.warn(e);
				else if (e.code == 'ENOTDIR') logger.warn("Failed to load theme %s, not a directory.", f);
				else if (e.code == 'ENOENT') logger.warn("Failed to load theme %s, missing conf.json.", f);
				else logger.warn(e);

				failedThemes++;
			}
		}));

		await this.server.db.setThemes(themes);

		let log = "Loaded " + themes.length + " theme" + (themes.length != 1 ? "s" : "");
		if (failedThemes) log += ", failed to load " + failedThemes + " theme" + (failedThemes != 1 ? "s" : "");
		else log += ".";
		logger.info(log);

		await this.parse();
	}

	async toggle(themes: string[]) {
		// Prune invalid active themes.
		const existing = (await this.server.db.getThemes()).map(t => t.identifier);
		this.enabledThemes = this.enabledThemes.filter(t => existing.indexOf(t) != -1);

		// Toggle themes.
		for (let theme of themes) {
			if (this.enabledThemes.indexOf(theme) != -1) this.enabledThemes.splice(this.enabledThemes.indexOf(theme), 1);
			else if (existing.indexOf(theme) != -1) this.enabledThemes.push(theme);
		}

		await this.server.db.setEnabledThemes(this.enabledThemes);
		await this.parse();
	}
}
