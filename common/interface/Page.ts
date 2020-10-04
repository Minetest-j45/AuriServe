export type ElementOrInclude = Element | string;

export interface Element {
	elem: string;
	props: {[key: string]: any};
	children?: ElementOrInclude[];
}

export interface PageMeta {
	title: string;
	description: string;
}

export interface Page extends PageMeta {
	elements: {
		header?: ElementOrInclude;
		main: ElementOrInclude;
		footer?: ElementOrInclude;
	}
}
