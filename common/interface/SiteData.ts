import { SiteInfo, Media, Theme, Plugin } from "./DBStructs";

export default interface SiteData extends SiteInfo {
	media: Media[]; 
	themes: Theme[];
	plugins: Plugin[];
}
