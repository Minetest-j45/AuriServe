import pug from "pug";
import * as Preact from "preact";
import renderToString from "preact-render-to-string";

import Elements from "./Elements"
import ThemeParser from "./ThemeParser"
import PluginParser from "./PluginParser"

export default class PageAssembler {
	private static invalidStyle = { backgroundColor: "#f00", color: "#fff", fontWeight: 800 };

	constructor(private themes: ThemeParser, private plugins: PluginParser, private elements: Elements, private root: string, private page: string) {}

	async assemble(): Promise<string> {
		// let store = new HydrationStore();

		const opt = {
			basedir: this.root,

			themes: this.themes.getEnabledThemes(),
			pluginStyles: this.plugins.getEnabledPlugins().filter(p => p.conf.sources.style).map(p => p.conf.identifier + "/" + p.conf.sources.style),
			pluginScripts: this.plugins.getEnabledPlugins().filter(p => p.conf.sources.client).map(p => p.conf.identifier + "/" + p.conf.sources.client),

			server: {
				createElement: this.createElement.bind(this),
				render: this.renderElement.bind(this)
			}
		}

		return pug.renderFile(this.page + ".pug", opt);
	}

	private createElement(identifier: string, props: Preact.ComponentProps<any>, ...children: Preact.VNode[]): Preact.VNode {	
		const elem = this.elements.getAllElements().get(identifier);
		if (!elem) return Preact.h("span", { style: PageAssembler.invalidStyle }, "Element " + identifier + " is not defined.");

		return Preact.h(elem.element, props ?? {}, ...(children ?? []));
	}

	private renderElement(node: Preact.VNode): string {
		return renderToString(node);
	}
}
