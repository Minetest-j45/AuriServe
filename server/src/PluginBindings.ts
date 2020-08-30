import Server from "./Server";
import { ElementDefinition } from "./Elements";

export default class PluginBindings {
	elements: Map<string, ElementDefinition> = new Map();

	constructor(_: Server, __: string) {
		this.registerElement = this.registerElement.bind(this);
	}

	registerElement(key: string, element: ElementDefinition): void {
		this.elements.set(key, element);
	}
}
