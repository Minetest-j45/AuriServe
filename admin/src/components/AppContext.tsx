import * as Preact from 'preact';
import PluginData from '../interface/PluginData';
import { Page } from '../../../common/interface/Page';
import { SiteData, SiteDataSpecifier } from '../../../common/interface/SiteData';

export interface AppContextData {
	plugins: PluginData;
	data: SiteData;

	getPageData(page: string): Promise<Page>;
	refreshSiteData(...types: SiteDataSpecifier[]): void;
	handleSiteData(data: SiteData): void;
}

export const AppContext = Preact.createContext<AppContextData>({} as any);
