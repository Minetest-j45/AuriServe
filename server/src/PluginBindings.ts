import Server from "./Server";
import { Element } from "./Elements";

export default class PluginBindings {
	elements: Map<string, typeof Element> = new Map();

	constructor(_: Server, __: string) {
		this.registerElement = this.registerElement.bind(this);
	}

	registerElement(key: string, element: typeof Element): void {
		this.elements.set(key, element);
	}
}
