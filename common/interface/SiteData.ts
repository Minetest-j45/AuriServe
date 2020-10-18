import { PageMeta } from './Page';
import { Config } from './Element';

import { SiteInfo, User, Media, Theme, Plugin } from './DBStructs';

export type SiteDataSpecifier = 'info' | 'media' | 'themes' | 'plugins' | 'users' | 'elements' | 'pages';

export interface SiteData extends SiteInfo {
	media: Media[];
	themes: Theme[];
	users: Omit<User, 'pass'>[];
	plugins: Plugin[];
	pages: {[key: string]: PageMeta};
	elementDefs: {[key: string]: Config};
}
