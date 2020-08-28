import path from "path";
import log4js from "log4js";
import rimraf from "rimraf";
import sass from "node-sass";
import { promises as fs, constants as fsc } from "fs";

import sanitize from "../../common/util/Sanitize";
import { Theme as DBTheme } from "../../common/interface/DBStructs";

import Database from "./Database";

const logger = log4js.getLogger();

export type Theme = DBTheme;

export default class ThemeParser {
	private enabledThemes: string[] = [];

	constructor(private db: Database) {};

	async init() {
		// Synchronize active themes representation with server.
		this.enabledThemes = await this.db.getEnabledThemes();
		
		// Reload themes list and parse themes.
		await this.refresh();
		
		// Force clearing of invalid themes.
		await this.toggle([]);
	}

	getActiveThemes(): string[] {
		return this.enabledThemes;
	}

	async parse() {
		const outPath = path.join(this.db.dataPath, "themes", "public");

		// Remove everything from themes/public.
		await new Promise((res) => rimraf(outPath, res));
		await fs.mkdir(outPath);

		// Parse all active themes and add them to themes/public.
		const enabledThemes = (await this.db.getSiteData()).themes!.filter(t => this.enabledThemes.indexOf(t.identifier) != -1);
		await Promise.all(enabledThemes.map(async (t) => {
			const themePath = path.join(this.db.dataPath, "themes", t.identifier);

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
	}
	
	async refresh() {
		let themes: Theme[] = [];
		let failedThemes = 0;

		const files = await fs.readdir(path.join(this.db.dataPath, "themes"));

		await Promise.all(files.map(async f => {
			if (f == "public") return;
			try {
				if (sanitize(f) != f) throw `Failed to parse theme ${f}, theme directory must be lowercase alphanumeric.`;

				const confStr = (await fs.readFile(path.join(this.db.dataPath, "themes", f, "conf.json"))).toString();
				
				let conf: Theme;
				try { conf = JSON.parse(confStr); }
				catch (e) { throw `Failed to parse configuration file for theme ${f}.\n ${e}`; }

				let cover = true;
				try { await fs.access(path.join(this.db.dataPath, "themes", f, "cover.jpg"), fsc.R_OK); }
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

		await this.db.setThemes(themes);

		let log = "Loaded " + themes.length + " theme" + (themes.length != 1 ? "s" : "");
		if (failedThemes) log += ", failed to load " + failedThemes + " theme" + (failedThemes != 1 ? "s" : "");
		else log += ".";
		logger.info(log);

		await this.parse();
	}

	async toggle(themes: string[]) {
		// Prune invalid active themes.
		const existing = (await this.db.getThemes()).map(t => t.identifier);
		this.enabledThemes = this.enabledThemes.filter(t => existing.indexOf(t) != -1);

		// Toggle themes.
		for (let theme of themes) {
			if (this.enabledThemes.indexOf(theme) != -1) this.enabledThemes.splice(this.enabledThemes.indexOf(theme), 1);
			else if (existing.indexOf(theme) != -1) this.enabledThemes.push(theme);
		}

		await this.db.setEnabledThemes(this.enabledThemes);
		await this.parse();
	}
}
