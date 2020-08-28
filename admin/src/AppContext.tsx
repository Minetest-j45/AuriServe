import * as React from 'react';
import SiteData from "../../common/interface/SiteData";

export interface AppContextData {
	handleSiteData(data: SiteData): void;
	data: SiteData;
}

export const AppContext = React.createContext<AppContextData>({
	handleSiteData: () => {},
	data: null as any
});
