import * as React from 'react';
import { SiteInfo } from "../../common/DBStructs";

export interface AppContextData {
	handleSiteData(data: SiteInfo): void;
	data: SiteInfo;
}

export const AppContext = React.createContext<AppContextData>({
	handleSiteData: () => {},
	data: null as any
});
