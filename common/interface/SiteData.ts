import { SiteInfo, Media, Theme, Plugin, Element } from "./DBStructs";

import { Config } from "./Element"; 

export type SiteDataSpecifier = "info" | "media" | "themes" | "plugins" | "elements" | "elementDefs";

export interface SiteData extends SiteInfo {
	media: Media[]; 
	themes: Theme[];
	plugins: Plugin[];
	elements: Element[];
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
	elementDefs?: {[key: string]: Config};
}
