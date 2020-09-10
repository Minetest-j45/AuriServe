export type Element = any;

export interface ElementPropField {
	name?: string;
	optional?: true;
	default?: any;

	type: string;
}

export interface ElementPropTable {
	name?: string;
	optional?: true;
	
	fields: ElementProps;
}

export interface ElementProps {
	[key: string]: ElementPropField | ElementPropTable;
};

export interface ElementConfig {
	props: ElementProps;
	manageElement?: Element;
	hydrate?: true;
}

export type ElementPair = { element: Element; config: ElementConfig };

export default class Elements {
	private lists: Set<Map<string, ElementPair>> = new Set();

	addList(list: Map<string, ElementPair>): void {
		this.lists.add(list);
	}

	removeList(list: Map<string, ElementPair>): void {
		this.lists.delete(list);
	}

	getAllElements(): Map<string, ElementPair> {
		let map: Map<string, ElementPair> = new Map();
		for (let m of this.lists) {
			for (let [k, v] of m) map.set(k, v);
		}
		return map;
	}
}
