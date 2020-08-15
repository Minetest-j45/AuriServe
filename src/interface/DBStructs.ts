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
