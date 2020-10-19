import pug from 'pug';
import path from 'path';
import log4js from 'log4js';
import * as Preact from 'preact';
import { promises as fs, constants as fsc } from 'fs';
import renderToString from 'preact-render-to-string';

import Elements from './Elements';
import ThemeParser from './ThemeParser';
import PluginParser from './PluginParser';

import * as Page from '../../common/interface/Page';

const logger = log4js.getLogger();

export default class PagesManager {
	private static invalidStyle = { backgroundColor: '#f00', color: '#fff', fontWeight: 800 };

	constructor(private themes: ThemeParser, private plugins: PluginParser, private elements: Elements, private pagesRoot: string) {}


	/**
	 * Gets a list of all pages with basic information attached.
	 */

	async getAllPages(): Promise<{[key: string]: Page.PageMeta}> {
		let dirs: string[] = [''];
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

						delete ((fileContents as Partial<Page.Page>).elements);
						pages[filePath.replace(/\.json$/g, '')] = fileContents;
					}
				})())
			);
		}

		return pages;
	}


	/**
	 * Returns a page document from a url string.
	 * Throws if there is no page at the requested path.
	 *
	 * @param {string} page - The path of the page requested.
	 */

	async getPage(page: string): Promise<Page.Page> {
		const p = path.join(this.pagesRoot, page + '.json');
		try {
			return JSON.parse((await fs.readFile(p)).toString()) as Page.Page;
		}
		catch (e) {
			logger.error('Error parsing page file \'%s\'.\n %s', p, e);
			throw 'No page found.';
		}
	}


	/**
	 * Returns a page document with all includes expanded.
	 * Throws if there is no page at the requested path.
	 *
	 * @param {string} page - The path of the page requested.
	 */

	async getExpandedPage(page: string): Promise<Page.Page> {
		const p = path.join(this.pagesRoot, page + '.json');
		try {
			let pageObj = JSON.parse((await fs.readFile(p)).toString()) as Page.Page;

			if (pageObj.elements.header)
				await this.recursivelyExpand(pageObj.elements.header, path.dirname(p));

			await this.recursivelyExpand(pageObj.elements.main, path.dirname(p));

			if (pageObj.elements.footer)
				await this.recursivelyExpand(pageObj.elements.footer, path.dirname(p));

			return pageObj;
		}
		catch (e) {
			logger.error('Error parsing page file \'%s\'.\n %s', p, e);
			throw 'No page found.';
		}
	}


	/**
	 * Updates a page's contents to the passed in Page object.
	 * Throws if the page doesn't exist or the user does not have permission to update it.
	 *
	 * @param {string} page - The page url to update.
	 * @param {Page} obj - Page object to update the page to.
	 */

	async updatePage(page: string, obj: Page.Page): Promise<void> {
		const p = path.join(this.pagesRoot, page + '.json');
		try {
			await fs.access(p, fsc.W_OK);
			await fs.writeFile(p, JSON.stringify(obj));
		}
		catch (e) {
			logger.error('Error updating page file \'%s\'.\n %s', p, e);
			throw 'Error updating page.';
		}
	}


	/**
	 * Renders `page`, where pages is the filename of a page inside the pagesRoot directory.
	 * Throws if the page does not exist, or if there is an error rendering.
	 *
	 * @param {string} page - The page to render.
	 */

	async renderPage(page: string): Promise<string> {
		const pugRoot = path.join(path.dirname(__dirname), 'views');
		page = path.join(this.pagesRoot, page);

		try {
			try {
				await fs.access(page + '.json');
			}
			catch (e) {
				await fs.access(path.join(page, 'index.json'));
				page = path.join(page, 'index');
			}

			const json = JSON.parse((await fs.readFile(page + '.json')).toString()) as Page.Page;

			const header = await this.renderTree(page, json.elements.header);
			const main = await this.renderTree(page, json.elements.main);
			const footer = await this.renderTree(page, json.elements.footer);

			const opt = {
				basedir: pugRoot,
				server: {
					title: json.title,
					themes: this.themes.getEnabledThemes(),
					plugins: {
						styles: this.plugins.getEnabledPlugins().filter(p => p.conf.sources.style)
							.map(p => p.conf.identifier + '/' + p.conf.sources.style),
						scripts: this.plugins.getEnabledPlugins().filter(p => p.conf.sources.client)
							.map(p => p.conf.identifier + '/' + p.conf.sources.client)
					},
					includes: {
						header: header,
						main: main,
						footer: footer
					}
				}
			};

			return pug.renderFile(path.join(pugRoot, 'template.pug'), opt);
		}
		catch (e) {
			// if (e.code == 'ENOENT') throw 404;

			return pug.renderFile(path.join(pugRoot, 'error.pug'), { error: e, stack: e.stack });
		}
	}


	/**
	 * Renders an element tree beginning at `root`. Return a HTML string.
	 *
	 * @param {string} page - The page to render.
	 * @param {Page.Child} root - The root element to render.
	 */

	private async renderTree(page: string, root?: Page.Child): Promise<string> {
		if (!root) return '';
		return renderToString(await this.recursivelyCreate(root, path.dirname(page)));
	}


	/**
	 * Recursively creates Preact elements using a serialized page element, and returns them.
	 * Throws if the page or page includes do not exist.
	 *
	 * @param {Page.Child} elemDef - The element to render or an include to a partial.
	 * @param {string} pathRoot - The path for includes to be relative to.
	 */

	private async recursivelyCreate(elemDef: Page.Child, pathRoot: string): Promise<Preact.VNode> {
		if (Page.isInclude(elemDef)) {
			const includeRoot = elemDef.include;
			elemDef = await this.expandInclude(elemDef, pathRoot);
			pathRoot = path.dirname(path.resolve(pathRoot, includeRoot));
		}

		const elem = this.elements.getAllElements().get(elemDef.elem);
		if (!elem) return Preact.h('span', { style: PagesManager.invalidStyle }, 'Element ' + elemDef.elem + ' is not defined.');

		let renderedChildren: Preact.VNode[] = [];

		for (let child of elemDef.children ?? [])
			renderedChildren.push(await this.recursivelyCreate(child, pathRoot));

		return Preact.h(elem.element, elemDef.props ?? {}, ...renderedChildren);
	}


	/**
	 *	Recursively expands a tree, manipulating the initial object.
	 * Throws if the includes do not exist.
	 */

	private async recursivelyExpand(elemDef: Page.Child, pathRoot: string): Promise<void> {
		if (Page.isInclude(elemDef)) {
			const includeRoot = elemDef.include;
			elemDef.elem = await this.expandInclude(elemDef, pathRoot);
			pathRoot = path.dirname(path.resolve(pathRoot, includeRoot));
		}

		for (let child of ((Page.isInclude(elemDef) ? elemDef.elem!.children : elemDef.children) || []))
			await this.recursivelyExpand(child, pathRoot);
	}


	/**
	 * Expands an include into a tree, overriding exposed properties with include props.
	 * Returns a Page.Element of the root element of the include.
	 * Throws if the include file doesn't exist.
	 *
	 * @param {Page.Include} include - The include to be expanded.
	 * @param {string} pathRoot - The path the include is relative to.
	 */

	private async expandInclude(include: Page.Include, pathRoot: string): Promise<Page.Element> {
		const includePath = path.join(pathRoot, include.include + '.json');
		pathRoot = path.dirname(path.resolve(pathRoot, include.include));

		let element = JSON.parse((await fs.readFile(includePath)).toString()) as Page.Element;
		await this.recursivelyOverride(element, include.override);

		return element;
	}


	/**
	 * Recursively overrides template children exposed props with include override props.
	 * Manipulates the passed in elemDef, does not return anything.
	 *
	 * @param {Page.Element} elemDef - The element to override with properties.
	 * @param {Page.IncludeProps} includeOverrides - The include override props to use.
	 */

	private async recursivelyOverride(elemDef: Page.Element, includeOverrides?: Page.IncludeProps): Promise<void> {
		if (includeOverrides && elemDef.exposeAs && includeOverrides[elemDef.exposeAs]) {
			Object.assign(elemDef.props, includeOverrides[elemDef.exposeAs]);
		}

		for (let child of elemDef.children ?? [])
			if (Page.isElement(child)) await this.recursivelyOverride(child, includeOverrides);
	}
}