import * as Preact from 'preact';
import PluginData from './interface/PluginData';
import { Page } from '../../common/interface/Page';
import { SiteData, SiteDataSpecifier } from '../../common/interface/SiteData';

export interface AppContextData {
	plugins: PluginData;
	data: Partial<SiteData>;

	getPageData(page: string): Promise<Page>;
	refreshSiteData(...types: SiteDataSpecifier[]): void;
	handleSiteData(data: Partial<SiteData>): void;
}

export const AppContext = Preact.createContext<AppContextData>({
	plugins: { elements: new Map() },
	data: {},

	getPageData: () => { throw 'getPageData called on default AppContext'; },
	refreshSiteData: () => { throw 'refreshSiteData called on default AppContext'; },
	handleSiteData: () => { throw 'handleSiteData called on default AppContext'; }
});
