import path from "path"
import Express from "express";
// import * as React from "react";
import { renderToString } from 'react-dom/server';

import Router from "./Router";
import Server from "../Server";
import Elements from "../Elements";

export default class PagesRouter extends Router {
	constructor(server: Server, private elements: Elements) {
		super(server);

		this.renderServerElement = this.renderServerElement.bind(this);
	}

	init() {
		this.server.app.get('*', (req, res, next) => {
			this.resolvePage(req, res, next);
		});
	}

	private renderServerElement(identifier: string, props?: any) {
		const elem = this.elements.getAllElements().get(identifier);
		if (!elem) return "<span style='background-color: #f00; color: #fff; font-weight: 800;'>SERVER ELEMENT '" + identifier + "' IS NOT DEFINED.</span>";
		//@ts-ignore
		return renderToString(new elem(props ?? {}).render());

		// return renderToString(React.createElement('div', null, React.createElement('h1', null, `Testing elements`), `Hello!`));
	}

	private async resolvePage(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
		const root = path.join(path.dirname(path.dirname(__dirname)), "views");
		const props = { 
			basedir: root, 
			themes: this.server.themes.getActiveThemes(), 
			ServerElement: this.renderServerElement };
		
		let page = path.join(this.server.dataPath, "pages", req.params[0]);

		try {
			res.render(page, props);
		} catch (e) { next(); }
	}
}
