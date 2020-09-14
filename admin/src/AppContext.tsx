import * as Preact from 'preact';
import SiteData from "../../common/interface/SiteData";

export interface AppContextData {
	handleSiteData(data: SiteData): void;
	data: SiteData;
}

export const AppContext = Preact.createContext<AppContextData>({
	handleSiteData: () => {},
	data: null as any
});
