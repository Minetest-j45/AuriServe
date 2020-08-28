import { ObjectID } from 'mongodb';

export interface Account {
	_id?: ObjectID;
	
	identifier: string;
	pass: string;

	super: boolean;
}

export interface AuthToken {
	_id?: ObjectID;

	identifier: string;
	token: string;
	expires: number;
}

export interface SiteInfo {
	_id?: ObjectID;

	domain: string;
	sitename: string;

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
