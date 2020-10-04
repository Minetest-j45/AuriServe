import { PageMeta } from "./Page";
import { Config } from "./Element"; 

import { SiteInfo, Media, Theme, Plugin, Element } from "./DBStructs";

export type SiteDataSpecifier = "info" | "media" | "themes" | "plugins" | "elements" | "elementDefs" | "pages";

export interface SiteData extends SiteInfo {
	media: Media[]; 
	themes: Theme[];
	plugins: Plugin[];
	elements: Element[];
	pages: {[key: string]: PageMeta};
	elementDefs: {[key: string]: Config};
}

export interface PartialSiteData {
	domain?: string;
	sitename?: string;

	mediaMax?: number;
	mediaUsed?: number;

	enabledThemes?: string[];
	enabledPlugins?: string[];

	media?: Media[];
	themes?: Theme[];
	plugins?: Plugin[];
	elements?: Element[];
	pages?: {[key: string]: PageMeta};
	elementDefs?: {[key: string]: Config};
}
