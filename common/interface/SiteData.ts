import { SiteInfo, Media, Theme, Plugin, Element } from "./DBStructs";

export default interface SiteData extends SiteInfo {
	media: Media[]; 
	themes: Theme[];
	plugins: Plugin[];
	elements: Element[];
}
