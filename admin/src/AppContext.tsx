import * as Preact from 'preact';
import PluginData from './interface/PluginData';
import SiteData from '../../common/interface/SiteData';

export interface AppContextData {
	plugins: PluginData;
	data: SiteData;

	handleSiteData(data: SiteData): void;
}

export const AppContext = Preact.createContext<AppContextData>({
	plugins: null as any,
	data: null as any,

	handleSiteData: () => { /* No handling for default context. */ }
});
