import * as Preact from 'preact';
import PluginData from "./interface/PluginData";
import SiteData from "../../common/interface/SiteData";

export interface AppContextData {
	handleSiteData(data: SiteData): void;
	plugins: PluginData;
	data: SiteData;
}

export const AppContext = Preact.createContext<AppContextData>({
	handleSiteData: () => {},
	plugins: null as any,
	data: null as any
});
