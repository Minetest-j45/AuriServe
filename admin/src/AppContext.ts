import Cookie from 'js-cookie';
import * as Preact from 'preact';
import { SiteData, SiteDataSpecifier } from '../../common/interface/SiteData';

export interface AppContextData {
	data: Partial<SiteData>;
	mergeData(data: Partial<SiteData>): void;
}

export const AppContext = Preact.createContext<AppContextData>({
	data: {}, mergeData: () => { throw 'Accessed default AppContext'; }});

export async function refreshSiteData(mergeData: (data: Partial<SiteData>) => void,
	refresh: SiteDataSpecifier | SiteDataSpecifier[]) {
	
	const refreshArray = Array.isArray(refresh) ? refresh : [ refresh ];
	const res = await fetch('/admin/data/' + refreshArray.join('&'), { cache: 'no-cache' });
	if (res.status !== 200) {
		Cookie.remove('tkn');
		location.href = '/admin';
		return {};
	}
	else {
		mergeData(await res.json());
		return res;
	}
};
