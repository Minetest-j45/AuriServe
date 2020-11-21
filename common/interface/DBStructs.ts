import { ObjectID } from 'mongodb';

export interface User {
	_id?: ObjectID;

	identifier: string;
	name: string;
	pass: string;

	roles: string[];
}

export interface AuthToken {
	_id?: ObjectID;

	identifier: string;
	token: string;
	expires: number;
}

export interface Role {
	identifier: string;
	color?: string;
	abilities: (keyof typeof RoleAbility)[];
}

export enum RoleAbility {
	/* Administrator */
	ADMINISTRATOR,

	/* Media */
	VIEW_MEDIA,
	MANAGE_MEDIA,
	REPLACE_MEDIA,
	EDIT_MEDIA_META,

	/* Pages */
	VIEW_PAGES,
	MANAGE_PAGES,
	EDIT_PAGES,

	/* Themes */
	VIEW_THEMES,
	MANAGE_THEMES,
	TOGGLE_THEMES,

	/* Plugins */
	VIEW_PLUGINS,
	MANAGE_PLUGINS,
	TOGGLE_PLUGINS,

	/* Users */
	VIEW_USERS,
	MANAGE_USERS,
	RESET_USER_PASSWORD,

	/* Roles */
	MANAGE_ROLES,

	/* Audit Log */
	VIEW_AUDIT_LOG
};

// export type RoleAbilitiesTable = {
// 	[key in keyof typeof RoleAbility]?: true;
// }

export interface SiteInfo {
	_id?: ObjectID;

	domain: string;
	sitename: string;
	description: string;

	mediaMax: number;
	mediaUsed: number;

	enabledThemes: string[];
	enabledPlugins: string[];
}

export interface Media {
	_id?: ObjectID;

	name: string;
	identifier: string;
	size: number;
	ext: string;

	path: string;
	publicPath: string;

	dimensions?: {x: number, y: number};

	uploadDate: number;
	uploadUser: string;
}

export interface Theme {
	_id?: ObjectID;

	identifier: string;

	name: string;
	description: string;
	author: string;
	hasCover: boolean;

	pre: string;
}

export interface Plugin {
	_id?: ObjectID;

	identifier: string;

	name: string;
	description: string;
	author: string;
	hasCover: boolean;
}
