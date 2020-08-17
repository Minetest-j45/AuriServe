import { ObjectID } from 'mongodb';

export interface Account {
	_id?: ObjectID;
	
	user: string;
	pass: string;

	super: boolean;
}

export interface AuthToken {
	_id?: ObjectID;

	user: string;
	token: string;
	expires: number;
}

export interface SiteInfo {
	_id?: ObjectID;
	
	domain: string;
	sitename: string;

	max_media: number;
}

export interface Media {
	_id?: ObjectID;

	name: string;
	path: string;
	ext: string;

	dimensions?: {x: number, y: number};

	uploadDate: number;
	uploadUser: string;
	
	size: number;
}
