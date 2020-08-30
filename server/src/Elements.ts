import * as Preact from "preact";

export interface ElementPropsDefinition {
	[key: string]: any
}

export interface ElementDefinition {
	element: Preact.ComponentType,
	props: ElementPropsDefinition,
	hydrate: boolean
}

export default class Elements {
	private lists: Set<Map<string, ElementDefinition>> = new Set();

	addList(list: Map<string, ElementDefinition>): void {
		this.lists.add(list);
	}

	removeList(list: Map<string, ElementDefinition>): void {
		this.lists.delete(list);
	}

	getAllElements(): Map<string, ElementDefinition> {
		let map: Map<string, ElementDefinition> = new Map();
		for (let m of this.lists) {
			for (let [k, v] of m) map.set(k, v);
		}
		return map;
	}
}
