import * as Preact from 'preact';
import PluginData from './interface/PluginData';
import { SiteData, SiteDataSpecifier } from '../../common/interface/SiteData';

export interface AppContextData {
	plugins: PluginData;
	data: SiteData;

	refreshSiteData(...types: SiteDataSpecifier[]): void;
	handleSiteData(data: SiteData): void;
}

export const AppContext = Preact.createContext<AppContextData>({
	plugins: null as any,
	data: null as any,

	refreshSiteData: () => { /* No handling for default context. */ },
	handleSiteData: () => { /* No handling for default context. */ }
});
