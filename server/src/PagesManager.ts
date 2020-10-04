import pug from "pug";
import path from "path";
import log4js from "log4js";
import * as Preact from "preact";
import { promises as fs } from "fs";
import renderToString from "preact-render-to-string";

import Elements from "./Elements";
import ThemeParser from "./ThemeParser";
import PluginParser from "./PluginParser";

import * as Page from "../../common/interface/Page";

const logger = log4js.getLogger()

export default class PagesManager {
	private static invalidStyle = { backgroundColor: "#f00", color: "#fff", fontWeight: 800 };

	constructor(private themes: ThemeParser, private plugins: PluginParser, private elements: Elements, private pagesRoot: string) {}


	/**
	* Gets a list of all pages with basic information attached.
	*/

	async getAllPages(): Promise<{[key: string]: Page.PageMeta}> {
		let dirs: string[] = [""];
		let pages: {[key: string]: Page.PageMeta} = {};

		while (dirs.length > 0) {
			const dir = dirs.pop()!;
			await Promise.all((await fs.readdir(path.join(this.pagesRoot, dir)))
				.map((f: string) => (async () => {
					const filePath = path.join(dir, f);
					const stat = await fs.lstat(path.join(this.pagesRoot, filePath));

					if (stat.isDirectory()) dirs.push(filePath);
					else if (stat.isFile() && f.endsWith('.json')) {
						let fileContents = JSON.parse((await fs.readFile(path.join(this.pagesRoot, filePath))).toString()) as Page.PageMeta;

						// File is not a page.
						if (!(fileContents as Page.Page).elements) return;

						delete ((fileContents as Page.Page).elements);
						pages[filePath.replace(/\.json$/g, '')] = fileContents;
					}
				})()
			));
		}

		return pages;
	}


	/**
	* Returns a page document from a url string.
	* Throws if there is no page by that url.
	*
	* @param {string} page - String identifier of the page.
	*/

	async getPage(page: string): Promise<Page.Page> {
		const p = path.join(this.pagesRoot, page + '.json');
		try {
			return JSON.parse((await fs.readFile(p)).toString()) as Page.Page;
		}
		catch (e) {
			logger.error('Error parsing page file \'%s\'.\n %s', p, e);
			throw "No page found.";
		}
	}


	/**
	* Renders `page`, where pages is the filename of a page inside the pagesRoot directory.
	* Throws if the page does not exist, or if there is an error rendering.
	*
	* @param {string} page - The page to render.
	*/

	async renderPage(page: string): Promise<string> {
		const pugRoot = path.join(path.dirname(__dirname), "views");
		page = path.join(this.pagesRoot, page);

		try {
			try {
				await fs.access(page + ".json");
			}
			catch (e) {
				await fs.access(path.join(page, "index.json"));
				page = path.join(page, "index");
			}

			const json = JSON.parse((await fs.readFile(page + ".json")).toString()) as Page.Page;

			const header = await this.renderTree(page, json.elements.header);
			const main = await this.renderTree(page, json.elements.main);
			const footer = await this.renderTree(page, json.elements.footer);

			const opt = {
				basedir: pugRoot,
				server: {
					themes: this.themes.getEnabledThemes(),
					plugins: {
						styles: this.plugins.getEnabledPlugins().filter(p => p.conf.sources.style).map(p => p.conf.identifier + "/" + p.conf.sources.style),
						scripts: this.plugins.getEnabledPlugins().filter(p => p.conf.sources.client).map(p => p.conf.identifier + "/" + p.conf.sources.client),
					},
					includes: {
						header: header,
						main: main,
						footer: footer
					}
				}
			}

			return pug.renderFile(path.join(pugRoot, "template.pug"), opt);
		}
		catch (e) {
			if (e.code == 'ENOENT') throw 404;

			return pug.renderFile(path.join(this.pagesRoot, "error.pug"), { error: e });
		}
	}


	/**
	* Renders an element tree beginning at `root`. Return a HTML string.
	*
	* @param {string} page - The page to render.
	* @param {string} root - The root element to render.
	*/

	private async renderTree(page: string, root?: Page.ElementOrInclude): Promise<string> {
		if (!root) return "";
		return renderToString(await this.recursivelyCreate(root, path.dirname(page)));
	}


	/**
	* Recursively creates Preact elements using a serialized page element, and returns them.
	*
	* @param {Page.ElementOrInclude} elemDef - The element to render or an include to a partial.
	* @param {string} pathRoot - The path for includes to be relative to.
	*/

	private async recursivelyCreate(elemDef: Page.ElementOrInclude, pathRoot: string): Promise<Preact.VNode> {
		if (typeof elemDef === "string") {

			const includePath = path.join(pathRoot, elemDef + ".json");
			pathRoot = path.dirname(path.resolve(pathRoot, elemDef));

			elemDef = JSON.parse((await fs.readFile(includePath)).toString()) as Page.Element;
		}

		const elem = this.elements.getAllElements().get(elemDef.elem);
		if (!elem) return Preact.h("span", { style: PagesManager.invalidStyle }, "Element " + elemDef.elem + " is not defined.");

		let renderedChildren: Preact.VNode[] = [];

		if (elemDef.children?.length)
			for (let child of elemDef.children)
				renderedChildren.push(await this.recursivelyCreate(child, pathRoot));

		return Preact.h(elem.element, elemDef.props ?? {}, ...renderedChildren);
	}
}
