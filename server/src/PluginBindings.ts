import { ServerDefinition } from '../../common/interface/Element';

export default class PluginBindings {
	elements: Map<string, ServerDefinition> = new Map();

	registerElement = (def: ServerDefinition): void => {
		this.elements.set(def.identifier, def);
	}
}
