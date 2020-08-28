import * as React from "react";

export interface ElementProps {
	[key: string]: any
}

export interface Element {
	element: typeof React.Component,
	props: ElementProps,
	children: boolean
}

export default class Elements {
	private lists: Set<Map<string, Element>> = new Set();

	addList(list: Map<string, Element>): void {
		this.lists.add(list);
	}

	removeList(list: Map<string, Element>): void {
		this.lists.delete(list);
	}

	getAllElements(): Map<string, Element> {
		let map: Map<string, Element> = new Map();
		for (let m of this.lists) {
			for (let [k, v] of m) map.set(k, v);
		}
		return map;
	}
}
