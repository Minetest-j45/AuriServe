import { SiteInfo, Media, Theme, Plugin, Element } from "./DBStructs";

import { Config } from "./Element"; 

export default interface SiteData extends SiteInfo {
	media: Media[]; 
	themes: Theme[];
	plugins: Plugin[];
	elements: Element[];
	elementDefs: {[key: string]: Config};
}
