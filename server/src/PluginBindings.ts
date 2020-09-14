import Server from "./Server";
import { Element, ElementConfig, ElementPair } from "./Elements";

export default class PluginBindings {
	elements: Map<string, ElementPair> = new Map();

	constructor(_: Server, __: string) {
		this.registerElement = this.registerElement.bind(this);
	}

	registerElement(key: string, element: Element, config: ElementConfig): void {
		this.elements.set(key, { element: element, config: config });
	}
}
