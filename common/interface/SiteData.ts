import { SiteInfo, Media, Theme, Plugin, Element } from "./DBStructs";
import { ElementConfig } from "./Element"; 

export default interface SiteData extends SiteInfo {
	media: Media[]; 
	themes: Theme[];
	plugins: Plugin[];
	elements: Element[];
	elementDefs: {[key: string]: ElementConfig};
}
