import { PageMeta } from './Page';
import { Config } from './Element';

import * as DB from './DBStructs';

export type SiteDataSpecifier = 'info' | 'media' | 'themes' | 'plugins' | 'users' | 'roles' | 'elements' | 'pages';

export interface SiteData extends DB.SiteInfo {
	media: DB.Media[];
	themes: DB.Theme[];
	users: Omit<DB.User, 'pass'>[];
	roles: DB.Role[],
	plugins: DB.Plugin[];
	pages: {[key: string]: PageMeta};
	elementDefs: {[key: string]: Config};
}
