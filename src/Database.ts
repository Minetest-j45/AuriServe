import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import log4js from "log4js"
const logger = log4js.getLogger()
import { MongoClient, Db } from 'mongodb';

import * as DB from './interface/DBStructs'

export default class Database {
	private client: MongoClient | null = null;
	private db: Db | null = null;

	async init(url: string, db: string) {
		this.client = new MongoClient(url, { useUnifiedTopology: true });

		try {
			await this.client.connect();
			logger.debug("Connected to MongoDB successfully.");

			this.db = this.client.db(db);
		}
		catch (e) {
			logger.fatal("Failed to connect to MongoDB instance %s with database %s.\n %s", url, db, e);
			process.exit(1);
		}
	}

	// async setHeader(subdomain: string, file: UploadedFile) {
	// 	const accountObj = await this.getAccount(subdomain);

	// 	if (file.mimetype != "image/png" && file.mimetype != "image/jpeg") 
	// 		throw "Uploaded file must be a PNG or JPEG file.";

	// 	if (file.size > 2 * 1024 * 1024 || file.truncated) 
	// 		throw "Uploaded file must be < 2MB.";

	// 	let ext = file.mimetype == "image/png" ? ".png" : ".jpg";
	// 	await file.mv(path.join(__dirname, "/../public/headers/" + subdomain + ext));

	// 	await this.db!.collection('calculators').updateOne(
	// 		{identifier: subdomain}, {$set: { "theme.hasHeader": ext }});
	// }

	/**
	* Get a User database object from a user user.
	* Throws if the user doesn't exist.
	*
	* @param {string} user - The username.
	*/

	async getAccount(user: string): Promise<DB.Account> {
		const accounts = this.db!.collection('accounts');
		const accountObj: DB.Account | null = await accounts.findOne({user: user});
		if (!accountObj) throw "This user no longer exists.";

		return accountObj;
	}


	/**
	* Create a user in the database from a user string, a name, and a password.
	* Throws if another user with the same user string already exists.
	*
	* @param {string} user - A username.
	* @param {string} password - A password.
	* @param {boolean} superUser - Whether or not the account should have super priveleges.
	*/

	async createAccount(user: string, password: string, superUser: boolean) {
		const accounts = this.db!.collection('accounts');
		if (await accounts.findOne({user: user}) != null) throw "This user already already exists.";

		let pass = await bcrypt.hash(password, 10);
		await accounts.insertOne({ user: user, pass: pass, super: superUser });
	}


	/**
	* Changes an account's password to the one specified.
	*
	* @param {string} user - The username. 
	* @param {string} password - The new password. 
	*/

	async updatePassword(user: string, password: string) {
		const accounts = this.db!.collection('accounts');
		let pass = await bcrypt.hash(password, 10);
		await accounts.updateOne({ user: user }, { $set: { pass: pass }});
	}


	/**
	* Deletes an account.
	*
	* @param {string} user - The account to delete.
	*/

	async deleteAccount(user: string) {
		const accounts = this.db!.collection('accounts');
		await accounts.deleteOne({ user: user });
	}



	/**
	* Deletes all super accounts.
	*/

	async deleteSuperAccounts() {
		const accounts = this.db!.collection('accounts');
		await accounts.deleteMany({ super: true });
	}


	/**
	* Lists all of the accounts
	*/

	async listAccounts() {
		const accounts = this.db!.collection('accounts');
		return (await accounts.find({}).toArray()).map((a: DB.Account) => a.user);
	}


	/**
	* Creates and returns an authentication token for a user using a username / password pair.
	* Throws if the username and password do not refer to a valid user.
	*
	* @param {string} user - The username that was provided.
	* @param {string} password - An unhashed password.
	*/

	async getAuthToken(user: string, password: string): Promise<string> {
		const accounts = this.db!.collection('accounts');
		const accountObj: DB.Account | null = await accounts.findOne({user: user});

		if (!accountObj || !await bcrypt.compare(password, accountObj.pass)) throw "Incorrect username or password.";

		const buffer = await crypto.randomBytes(48);
		const token = buffer.toString('hex');

		const tokens = this.db!.collection('tokens');
		const tkn = {user: accountObj.user, token: token, expires: (Date.now() / 1000) + 60 * 60 * 24 * 3};
		await tokens.insertOne(tkn);

		return token;
	}


	/**
	* Returns the user user that a token points to when provided with a
	* token string or a network request containing a 'tkn' cookie.
	* Throws if the token doesn't exist.
	*
	* @param {string | request} token - The token to authenticate.
	*/

	async authUser(token: string | any): Promise<string> {
		if (typeof token !== "string") {
			if (!token.cookies || !token.cookies.tkn || typeof token.cookies.tkn != "string") 
				throw "Auth token is no longer valid, please reload the page.";
			token = token.cookies.tkn;
		}

		await this.pruneTokens();
		let inst: DB.AuthToken | null = await this.db!.collection('tokens').findOne({token: token});
		if (!inst) throw "Auth token is no longer valid, please reload the page.";
		
		return inst.user;
	}


	/**
	* Prune authentication tokens that are past their expiry date.
	*/

	private async pruneTokens() {
		const tokens = this.db!.collection('tokens');
		await tokens.deleteMany({expires: {$lt: (Date.now() / 1000)}});
	}


	/**
	* Sanitize a name for use as an identifier, and return that value.
	* Throws if the passed in value isn't a string, or identifier generated is empty.
	*
	* @param {string} name - The name to be sanitized.
	*/

	sanitizeName(name: string) {
		if (typeof name != "string" || name.length < 1) throw "Name must not be empty.";
		const sanitized = name.toLowerCase().replace(/[ -]/g, '_').replace(/[^a-zA-Z0-9_]/g, '');
		if (sanitized.length == 0) throw "Name must include at least one alphanumeric character.";
		return sanitized;
	}
}
