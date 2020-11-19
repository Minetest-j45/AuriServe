import * as Preact from 'preact';
import { SiteData } from '../../common/interface/SiteData';

export interface AppContextData {
	data: Partial<SiteData>;
	mergeData(data: Partial<SiteData>): void;
}

export const AppContext = Preact.createContext<AppContextData>({
	data: {}, mergeData: () => { throw 'Accessed default AppContext'; }});
