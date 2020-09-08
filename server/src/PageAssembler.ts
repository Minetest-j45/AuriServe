import pug from "pug";
import * as Preact from "preact";
import renderToString from "preact-render-to-string";

import Elements from "./Elements"
import ThemeParser from "./ThemeParser"
import PluginParser from "./PluginParser"

// class HydrationStore {
// 	private props: Preact.ComponentProps<any>[] = [];

// 	storeProps(props: Preact.ComponentProps<any>) {
// 		let p = Object.assign(props);
// 		delete p.children; 

// 		this.props.push(p);
// 		return this.props.length - 1;
// 	}
// }

export default class PageAssembler {
	private static invalidStyle = { backgroundColor: "#f00", color: "#fff", fontWeight: 800 };

	constructor(private themes: ThemeParser, private plugins: PluginParser, private elements: Elements, private root: string, private page: string) {}

	async assemble(): Promise<string> {
		// let store = new HydrationStore();

		const opt = {
			basedir: this.root,

			themes: this.themes.getEnabledThemes(),
			plugins: this.plugins.getEnabledPlugins().filter(p => p.conf.sources.client).map(p => p.conf.identifier),

			server: {
				createElement: this.createElement.bind(this),
				render: this.renderElement.bind(this)
			}
		}

		return pug.renderFile(this.page + ".pug", opt);
	}

	private withHydration(identifier: string, elem: Preact.ComponentType): Preact.ComponentType {
		return class extends Preact.Component {
			render(props: Preact.ComponentProps<any>) {
				// const hid = store.storeProps(props);

				let safeProps = Object.assign({}, props);
				delete safeProps.children;

				return Preact.h(Preact.Fragment, null, 
					Preact.h("script", {type: "application/hydrate", "data-element": identifier, 
						dangerouslySetInnerHTML: { __html: JSON.stringify(safeProps) }}),
					Preact.h(elem, props));
			}
		}
	}

	private createElement(identifier: string, props: Preact.ComponentProps<any>, ...children: Preact.VNode[]): Preact.VNode {	
		const elem = this.elements.getAllElements().get(identifier);
		if (!elem) return Preact.h("span", { style: PageAssembler.invalidStyle }, "Element " + identifier + " is not defined.");

		let element = elem.element;
		if (elem.hydrate) element = this.withHydration(identifier, elem.element);

		return Preact.h(element, props ?? {}, ...(children ?? []));
	}

	private renderElement(node: Preact.VNode): string {
		return renderToString(node);
	}
}
