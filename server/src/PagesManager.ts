import pug from 'pug';
import path from 'path';
import log4js from 'log4js';
import { JSDOM } from 'jsdom';
import * as Preact from 'preact';
import renderToString from 'preact-render-to-string';
import { promises as fs, constants as fsc } from 'fs';
import { Page, SiteData, Media } from 'auriserve-api';

import Elements from './Elements';
import Themes from './data/Themes';
import Plugins from './data/Plugins';
import UndefinedElement from './UndefinedElement';

const logger = log4js.getLogger();

type GetSiteData = (s?: string) => Promise<Partial<SiteData>>;

type ExposedTree = { [key: string]: Page.Element };
type ExposedMap = { [tree: string]: ExposedTree };

export default class PagesManager {
	root: string;
	themes: Themes;


	/**
	 * Handles generating and expanding pages.
	 * Can create an HTML representation of a page,
	 * or return an expanded JSON representation with includes included.
	 *
	 * @param {Plugins} plugins - The plugin parser.
	 * @param {DBView} db - The database.
	 * @param {Elements} elements - The registered elements.
	 * @param {GetSiteData} getSiteData - The getSiteData function.
	 * @param {string} dataPath - The root data path for AuriServe.
	 */

	constructor(private plugins: Plugins, private elements: Elements,
		private getSiteData: GetSiteData, private dataPath: string) {
		
		this.root = path.join(this.dataPath, 'pages');
		this.themes = new Themes(this.dataPath);
	}


	/**
	 * Initializes the PagesManager,
	 * creates the pages directory if it doesn't exist already.
	 */

	async init() {
		try {
			await fs.access(this.root, fsc.R_OK);
		}
		catch (e) {
			fs.mkdir(this.root);
		}
		this.themes.init();
	}


	/**
	 * Renders the page requested, returning an HTML string.
	 * Returns an error page if an error occurs during rendering.
	 * Throws an HTML error code if the requested page does not exist.
	 *
	 * @param {string} page - The page to render.
	 * @returns a tuple containing the rendered page and an HTML response code.
	 */

	async render(page: string): Promise<[ string, number ]> {
		const pugRoot = path.join(path.dirname(__dirname), 'views');

		// Redirect to an index if target is a folder.

		try {
			try { await fs.access(path.join(this.root, page + '.json')); }
			catch (e) {
				await fs.access(path.join(this.root, page, 'index.json'));
				page = path.join(page, 'index');
			}
		}
		catch (e) { /* Continue on */ }

		// Begin rendering the page, *safely*.

		try {
			const { media, sitename: siteTitle, description: siteDescription, favicon } = await this.getSiteData('media&info');

			const json = await this.getPreparedPage(page);
			const faviconItem = (media ?? []).filter(m => m.identifier === favicon)[0];

			let rendered: {[key: string]: string } = {};
			await Promise.all(Object.keys(json.elements).map(async (key) =>
				rendered[key] = await this.renderTree(page, json.elements[key])));

			const layouts = await this.themes.listLayouts();
			const layout = layouts.get(json.layout) ?? layouts.get('default');

			if (!layout) throw `Layout '${json.layout}' doesn't exist.`;
			const { document } = (new JSDOM(layout)).window;

			document.querySelectorAll('[data-include]').forEach(e => {
				const section = e.getAttribute('data-include') ?? '';
				if (!rendered[section]) return e.remove();
				const div = document.createElement('div');
				div.innerHTML = rendered[section];
				while (div.childNodes.length > 0) e.append(div.childNodes[0]);
				delete rendered[section];
				e.removeAttribute('data-include');
			});

			return [ pug.renderFile(path.join(pugRoot, 'page.pug'), {
				basedir: pugRoot,
				server: {

					// Metadata
					title: (json.title ? `${json.title}&nbsp; • &nbsp;` : '') + siteTitle,
					description: json.description || siteDescription,
					favicon: favicon + (faviconItem ? '.' + faviconItem.ext : ''),

					// Themes
					themes: this.themes.listEnabled().map(t => t.config.identifier),
					
					// Plugins
					plugins: {
						styles: this.plugins.listEnabled().filter(p => p.config.sources.client?.style)
							.map(p => p.config.identifier + '/' + p.config.sources.client?.style),
						scripts: this.plugins.listEnabled().filter(p => p.config.sources.client?.script)
							.map(p => p.config.identifier + '/' + p.config.sources.client?.script)
					},

					// Actual page content
					content: document.documentElement.innerHTML
				}
			}), 200 ];
		}
		catch (e) {
			if (typeof e === 'object' && typeof e.description === 'string' && typeof e.code === 'number')
				return [ pug.renderFile(path.join(pugRoot, 'error.pug'), e), e.code ];
			throw e;
		}
	}


	/**
	 * Returns a raw page document, not ready for use.
	 * Throws if there is no page at the requested path.
	 *
	 * @param {string} page - The page to return.
	 * @returns an unexpanded page object.
	 */

	async getPage(page: string): Promise<Page.Page> {
		const p = path.join(this.root, page + '.json');
		try { return JSON.parse((await fs.readFile(p)).toString()) as Page.Page; }
		catch (e) {
			if (e.code === 'ENOENT') throw { code: 404, description: 'Page not found.' };
			throw { code: 500, description: 'Internal server error.', stack: e.stack};
		}
	}


	/**
	 * Returns a page that has been prepared for use.
	 * Throws if there is no page at the requested path.
	 *
	 * @param {string} page - The page to expand.
	 */

	async getPreparedPage(page: string): Promise<Page.Page> {
		const { media } = await this.getSiteData('media');
		const p = path.join(this.root, page + '.json');
			
		try {
			const pageObj = await this.getPage(page);

			await Promise.all(Object.keys(pageObj.elements).map(async (key) =>
				await this.includeTree(pageObj.elements[key], path.dirname(p))));

			const exposed = await this.exposePage(pageObj);
			
			await Promise.all(Object.keys(pageObj.elements).map(async (key) =>
				await this.parseTree(key, pageObj.elements[key], media ?? [], exposed)));

			return pageObj;
		}
		catch (e) {
			if (typeof e.code === 'number') throw e;
			throw { code: 500, description: 'Internal server error.', stack: e.stack };
		}
	}


	/**
	 * Returns a map of PageMeta objects for each page.
	 *
	 * @returns a key-value map of PageMeta, where the key is the path beginning at the root.
	 */

	async getAllPages(): Promise<{[key: string]: Page.PageMeta}> {
		let dirs: string[] = [ '' ];
		let pages: {[key: string]: Page.PageMeta} = {};

		while (dirs.length > 0) {
			const dir = dirs.pop()!;

			await Promise.all((await fs.readdir(path.join(this.root, dir)))
				.map((file: string) => (async () => {
	
					const filePath = path.join(dir, file);
					const stat = await fs.lstat(path.join(this.root, filePath));

					if (stat.isDirectory()) dirs.push(filePath);
					else if (stat.isFile() && file.endsWith('.json')) {

						let fileContents = JSON.parse(
							(await fs.readFile(path.join(this.root, filePath))).toString()) as Page.PageMeta;

						// If 'elements' is not defined, file is not a page.
						if (!(fileContents as Page.Page).elements) return;

						// Remove the 'elements' property, we just want metadata.
						delete ((fileContents as Partial<Page.Page>).elements);

						pages[filePath.replace(/\.json$/g, '')] = fileContents;
					}
				})())
			);
		}

		return pages;
	}


	/**
	 * Writes new data to a page.
	 * Throws if the requested page doesn't exist or it isn't updateable.
	 *
	 * @param {string} page - The page to update.
	 * @param {Page} obj - Page object to update the page to.
	 */

	async updatePage(page: string, obj: Page.Page): Promise<void> {
		const p = path.join(this.root, page + '.json');
		try { await fs.writeFile(p, JSON.stringify(obj)); }
		catch (e) {
			logger.error('Error updating page file \'%s\'.\n %s', p, e);
			throw 'Error updating page.';
		}
	}


	/**
	 * Renders an element tree into HTML.
	 *
	 * @param {string} page - The path of the page to render.
	 * @param {Child} root - The root element to render.
	 * @returns the rendered HTML as a string.
	 */

	private async renderTree(page: string, root: Page.Child): Promise<string> {
		return renderToString(await this.createTree(root, path.dirname(page)));
	}


	/**
	 * Creates Preact elements recursively, starting at the provided element.
	 * Throws if the page or page includes do not exist.
	 *
	 * @param {Child} child - The root element to render, must be expanded.
	 * @param {string} pathRoot - The path that includes are relative to.
	 * @returns a Preact VNode representing the root of the tree.
	 */

	private async createTree(child: Page.Child, pathRoot: string): Promise<Preact.VNode> {
		const elem: Page.Element = Page.isInclude(child) ? child.elem! : child;
		if (Page.isInclude(elem)) pathRoot = path.dirname(path.resolve(pathRoot, elem.include));

		const render = this.elements.getAllElements().get(elem.elem);
		if (!render) return Preact.h(UndefinedElement, { elem: elem.elem });

		let children: any[] = [];
		for (let child of elem.children ?? []) children.push(await this.createTree(child, pathRoot));
		
		return Preact.h(render.element, { ...elem.props, children: children });
	}


	/**
	 * Recursively expands includes in a tree.
	 * Directly manipulates the passed-in object, does not return anything.
	 * Throws if the required includes do not exist.
	 *
	 * @param {Child} elem - The root element to expand.
	 * @param {string} pathRoot - The path that includes are relative to.
	 */

	private async includeTree(elem: Page.Child, pathRoot: string): Promise<void> {
		if (Page.isInclude(elem)) {
			const includePath = elem.include;
			elem.elem = await this.expandInclude(elem, pathRoot);
			pathRoot = path.resolve(pathRoot, path.dirname(includePath));
		}

		const element: Page.Element = Page.isInclude(elem) ? elem.elem! : elem;
		for (let child of element.children || []) await this.includeTree(child, pathRoot);
	}


	/**
	 * Recursively exposes a page, storing named references to all elements containing
	 * an 'exposeAs' key. Returns a key-value map of the elements organized by tree.
	 *
	 * @param {Page} page - The page to expose.
	 */

	private exposePage(page: Page.Page) {
		let exposedMap: ExposedMap = {};
		Object.keys(page.elements).map((key) => {
			exposedMap[key] = this.exposeTree(page.elements[key]);
		});
		return exposedMap;
	}


	/**
	 * Recursively exposes a tree, storing named references to all elements containing
	 * an 'exposeAs' key. Returns a key-value map of the elements.
	 *
	 * @param {Child} elem - The root element to expand.
	 */

	private exposeTree(elem: Page.Child): ExposedTree {
		let exposedTree: ExposedTree = {};

		const expose: Page.Element = Page.isInclude(elem) ? elem.elem! : elem;
		if (expose.exposeAs) exposedTree[expose.exposeAs] = expose;

		for (let child of expose.children || []) exposedTree = { ...exposedTree, ...this.exposeTree(child) };

		return exposedTree;
	}


	/**
	 * Recursively parses the properties of an element tree.
	 * Directly manipulates the passed-in object, does not return anything.
	 *
	 * @param {string} tree - The identifier of the tree that is being expanded.
	 * @param {Child} elem - The root element to expand.
	 * @param {Media[]} media - The current SiteData media array.
	 * @param {ExposedMap} exposed - The tree's exposed map.
	 */

	private async parseTree(tree: string, elem: Page.Child, media: Media[], exposed: ExposedMap): Promise<void> {
		const parse: Page.Element = Page.isInclude(elem) ? elem.elem! : elem;
		if (parse.props) parse.props = await this.parseProps(parse.props, media, tree, exposed);

		for (let child of parse.children || []) await this.parseTree(tree, child, media, exposed);
	}


	/**
	 * Expands an include into a tree, overriding exposed properties with include props.
	 * Throws the requested include doesn't exist.
	 *
	 * @param {Include} include - The include to be expanded.
	 * @param {string} pathRoot - The path that includes are relative to.
	 * @returns a page element representing the expanded include root.
	 */

	private async expandInclude(include: Page.Include, pathRoot: string): Promise<Page.Element> {
		const includePath = path.join(pathRoot, include.include + '.json');
		let element = JSON.parse((await fs.readFile(includePath)).toString()) as Page.Element;
		await this.overrideTree(element, include.override);

		return element;
	}


	/**
	 * Recursively overrides template children exposed props with include override props.
	 * Manipulates the passed in elemDef, does not return anything.
	 *
	 * @param {Page.Element} elemDef - The element to override with properties.
	 * @param {IncludeProps} includeOverrides - The include override props to use.
	 */

	private async overrideTree(elemDef: Page.Element, includeOverrides?: Page.IncludeProps): Promise<void> {
		if (includeOverrides && elemDef.exposeAs && includeOverrides[elemDef.exposeAs]) {
			Object.assign(elemDef.props, includeOverrides[elemDef.exposeAs]);
		}

		for (let child of elemDef.children ?? [])
			if (Page.isElement(child)) await this.overrideTree(child, includeOverrides);
	}


	/**
	 * Reads a Prop Ref and returns a list of keys.
	 *
	 * @param {string} ref - The prop ref to parse.
	 */

	private parsePropRef(ref: string): { page?: string; tree?: string; exposed: string } {
		let page: string | undefined  = undefined;
		let tree: string | undefined = undefined;
		let exposed: string = ref;

		const space = ref.indexOf(' ');
		let period = ref.indexOf('.');

		if (space > -1) {
			page = ref.substr(0, space);
			ref = ref.substr(space + 1);
			period -= space + 1;
			exposed = ref;
		}

		if (period > -1) {
			tree = ref.substr(0, period);
			ref = ref.substr(period + 1);
			exposed = ref;
		}

		return { page, tree, exposed };
	}


	/**
	 * Applies transformations to a non-trivial property,
	 * e.g. filling out a media prop with the rest of the fields.
	 *
	 * @param {any} props - The property to parse.
	 * @param {Media[]} media - The current SiteData media array.
	 * @param {string} myTree - The tree the prop is contained in.
	 * @param {ExposedMap} exposedMap - A map of exposed props.
	 *
	 * @returns {any} - The modified property.
	 */

	private async parseProp(prop: any, media: Media[], myTree: string, exposedMap: ExposedMap): Promise<any> {
		let wasValue = false;

		if (typeof prop === 'object') {
			if ('identifier' in prop) {
				const mediaItem = (media || []).filter(m => m.identifier === prop.identifier)[0];
				if (mediaItem) prop = mediaItem;
				delete prop.path;
				delete prop._id;
				wasValue = true;
			}
			else if ('_AS_PROP_REF' in prop) {
				const { page, tree, exposed } = this.parsePropRef(prop._AS_PROP_REF);
				if (page) {
					const pageObj = await this.getPage(page);
					exposedMap = this.exposePage(pageObj);
				}
				
				prop = { _AS_PROP_REF: prop._AS_PROP_REF, ...exposedMap[tree ?? myTree][exposed].props };
			}
		}
		else wasValue = true;

		return [ prop, wasValue ];
	}

	/**
	 * Applies transformations to non-trivial properties, modifying the table directly.
	 * e.g. filling out a media prop with the rest of the fields.
	 *
	 * @param {any} prop - The props table to parse through.
	 * @param {Media[]} media - The current SiteData media array.
	 * @param {string} tree - The tree the props are contained in.
	 * @param {ExposedMap} exposedMap - A map of exposed props.
	 */

	private async parseProps(prop: any, media: Media[], tree: string, exposedMap: ExposedMap) {
		const [ newProp, wasValue ] = await this.parseProp(prop, media, tree, exposedMap);
		prop = newProp;

		if (!wasValue && typeof prop === 'object') {
			if (Array.isArray(prop)) for (let i = 0; i < prop.length; i++)
				prop[i] = await this.parseProps(prop[i], media, tree, exposedMap);

			else if (typeof prop === 'object') for (let iden of Object.keys(prop)) {
				prop[iden] = await this.parseProps(prop[iden], media, tree, exposedMap);
			}
		}

		return prop;
	}
}
