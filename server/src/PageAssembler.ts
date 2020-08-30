import pug from "pug";
import * as Preact from "preact";
import renderToString from "preact-render-to-string";

import Elements from "./Elements"
import ThemeParser from "./ThemeParser"

class HydrationStore {
	private props: Preact.ComponentProps<any>[] = [];

	storeProps(props: Preact.ComponentProps<any>) {
		let p = Object.assign(props);
		delete p.children; 

		this.props.push(p);
		return this.props.length - 1;
	}
}

export default class PageAssembler {
	private static invalidStyle = { backgroundColor: "#f00", color: "#fff", fontWeight: 800 };

	constructor(private themes: ThemeParser, private elements: Elements, private root: string, private page: string) {}

	async assemble(): Promise<string> {
		let store = new HydrationStore();

		const opt = {
			basedir: this.root,

			themes: this.themes.getActiveThemes(),

			server: {
				createElement: this.createElement.bind(this, store),
				render: this.renderElement
			}
		}

		return pug.renderFile(this.page + ".pug", opt);
	}

	private withHydration(identifier: string, elem: Preact.ComponentType, store: HydrationStore): Preact.ComponentType {
		return class extends Preact.Component {
			render(props: Preact.ComponentProps<any>) {
				const hid = store.storeProps(props);

				let safeProps = Object.assign({}, props, {__type: identifier});
				delete safeProps.children;

				return Preact.h(Preact.Fragment, null, 
					Preact.h("script", {type: "application/hydrate", "data-hid": hid, dangerouslySetInnerHTML: { __html: JSON.stringify(safeProps) }}),
					Preact.h(elem, props));
			}
		}
	}

	private createElement(store: HydrationStore, identifier: string, props: Preact.ComponentProps<any>, ...children: Preact.VNode[]): Preact.VNode {		
		const elem = this.elements.getAllElements().get(identifier);
		if (!elem) return Preact.h("span", { style: PageAssembler.invalidStyle }, "Element " + identifier + " is not defined.");

		let element = elem.element;
		if (elem.hydrate) element = this.withHydration(identifier, elem.element, store);

		return Preact.h(element, props ?? {}, ...(children ?? []));
	}

	private renderElement(node: Preact.VNode): string {
		return renderToString(node);
	}
}
