import path from "path"
import Express from "express";
import * as Preact from "preact";
import render from "preact-render-to-string";

import Router from "./Router";
import Server from "../Server";
import Elements from "../Elements";


export default class PagesRouter extends Router {
	constructor(server: Server, private elements: Elements) {
		super(server);

		this.render = this.render.bind(this);
		this.serverElement = this.serverElement.bind(this);
	}

	init() {
		this.server.app.get('*', (req, res, next) => {
			this.resolvePage(req, res, next);
		});
	}

	private serverElement(identifier: string, props?: any, ...children: Preact.VNode[]): React.ReactNode {
		const invalidStyle = { backgroundColor: "#f00", color: "#fff", fontWeight: 800 };

		const elem = this.elements.getAllElements().get(identifier);

		if (!elem) return Preact.h("span", { style: invalidStyle }, "Element " + identifier + " is not defined.");
		if (!elem.children && children.length) return Preact.h("span", { style: invalidStyle }, "Element " + identifier + " may not have children.");

		if (typeof props == "string") console.log("Load DB specification pls")

		return Preact.h(elem.element, props ?? {}, ...(children ?? []));
	}

	private render(node: Preact.VNode): string {
		return render(node);
	}

	private async resolvePage(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
		const root = path.join(path.dirname(path.dirname(__dirname)), "views");
		const props = { 
			basedir: root, 
			themes: this.server.themes.getActiveThemes(),
			server: {
				createElement: this.serverElement,
				render: this.render 
			}
		};
		
		let page = path.join(this.server.dataPath, "pages", req.params[0]);

		try {
			res.render(page, props);
		} catch (e) { next(); }
	}
}
