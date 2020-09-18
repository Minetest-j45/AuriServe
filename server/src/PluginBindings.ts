import Server from "./Server";
import { ServerDefinition } from '../../common/interface/Element';

export default class PluginBindings {
	elements: Map<string, ServerDefinition> = new Map();

	constructor(_: Server, __: string) {
		this.registerElement = this.registerElement.bind(this);
	}

	registerElement(def: ServerDefinition): void {
		this.elements.set(def.identifier, def);
	}
}
