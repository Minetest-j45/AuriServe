import * as React from "react";

export class Element extends React.Component {}

export default class Elements {
	private lists: Set<Map<string, typeof Element>> = new Set();

	addList(list: Map<string, typeof Element>): void {
		this.lists.add(list);
	}

	removeList(list: Map<string, typeof Element>): void {
		this.lists.delete(list);
	}

	getAllElements(): Map<string, typeof Element> {
		let map: Map<string, typeof Element> = new Map();
		for (let m of this.lists) {
			for (let [k, v] of m) map.set(k, v);
		}
		return map;
	}
}
