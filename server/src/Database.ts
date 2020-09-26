import path from 'path';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import log4js from "log4js";
import { MongoClient, Db } from 'mongodb';
import { UploadedFile } from "express-fileupload";
import { promises as fs, constants as fsc } from 'fs';

import * as DB from '../../common/interface/DBStructs';
import { SiteDataSpecifier, PartialSiteData } from '../../common/interface/SiteData';

const logger = log4js.getLogger();

export enum MediaStatus {
	OK,
	INVALID,
	EXISTS,
	MEDIA_LIMIT
}

export default class Database {
	private client: MongoClient | null = null;
	private db: Db | null = null

	dataPath: string;

	constructor(dataPath: string) {
		this.dataPath = dataPath;
	}

	async init(url: string, db: string) {
		this.client = new MongoClient(url, { useUnifiedTopology: true });

		try {
			await this.client.connect();
			logger.debug("Connected to MongoDB successfully.");

			this.db = this.client.db(db);

			if (!await this.db.collection('siteinfo').findOne({})) {
				await this.db.collection('siteinfo').insertOne({
					domain: "example.com",
					sitename: "Example",

					mediaMax: 1*1024*1024*1024,
					mediaUsed: 0,

					enabledThemes: [],
					enabledPlugins: []
				} as DB.SiteInfo);
			}
		}
		catch (e) {
			logger.fatal("Failed to connect to MongoDB instance %s with database %s.\n %s", url, db, e);
			process.exit(1);
		}
	}


	/**
	* Sets the contents of the plugins collection to the
	* Passed in array of theme objects.
	*/

	async setPlugins(plugins: DB.Plugin[]) {
		const collection = this.db!.collection('plugins');
		await collection.deleteMany({});
		if (plugins.length) await collection.insertMany(plugins);
	}


	/**
	* Returns the active plugins.
	*
	* @param {string[]} identifiers - Themes to be activated.
	*/

	async getEnabledPlugins(): Promise<string[]> {
		let info = this.db!.collection("siteinfo");
		let themes = await info.findOne({}, { projection: { enabledPlugins: 1 }});
		return themes.enabledPlugins || [];
	}


	/**
	* Sets the active plugins to the string provided.
	*
	* @param {string[]} identifiers - Themes to be activated.
	*/

	async setEnabledPlugins(plugins: string[]) {
		let info = this.db!.collection("siteinfo");
		await info.updateOne({}, { $set: { enabledPlugins: plugins }});
	}


	/**
	* Returns an array of every currently loaded theme
	*/

	async getThemes() {
		const collection = this.db!.collection('themes');
		return await (await collection.find({})).toArray();
	}


	/**
	* Sets the contents of the themes collection to the
	* Passed in array of theme objects.
	*
	* @param {Db.Theme[]} themes - The themes to populate the array with.
	*/

	async setThemes(themes: DB.Theme[]) {
		const collection = this.db!.collection('themes');
		await collection.deleteMany({});
		if (themes.length) await collection.insertMany(themes);
	}


	/**
	* Returns the enabled themes.
	*
	* @param {string[]} identifiers - Themes to be activated.
	*/

	async getEnabledThemes(): Promise<string[]> {
		let info = this.db!.collection("siteinfo");
		let themes = await info.findOne({}, { projection: { enabledThemes: 1 }});
		return themes.enabledThemes || [];
	}


	/**
	* Sets the enabled themes to the string provided.
	*
	* @param {string[]} identifiers - Themes to be activated.
	*/

	async setEnabledThemes(themes: string[]) {
		let info = this.db!.collection("siteinfo");
		await info.updateOne({}, { $set: { enabledThemes: themes }});
	}


	/**
	* Accept a file as a media asset. 
	* Add it to the database and move it into the media folder.
	*
	* @param {string} user - The uploading user.
	* @param {string} name - A name for the asset.
	* @param {string} identifier - A sanitized asset identifier.
	* @param {UploadedFile} media - The file to accept.
	*/

	async acceptMedia(user: string, media: UploadedFile, name: string, identifier: string): Promise<MediaStatus> {
		try {
			if (identifier.length > 32 || name.length > 32) return MediaStatus.INVALID;
			let siteinfo = this.db!.collection('siteinfo');
	
			// Make sure there is space in the server for
			// the media, and update the media used value.
			const max = (await siteinfo.findOne({})).mediaMax;
			const ret = await this.db!.collection('siteinfo').findOneAndUpdate(
				{mediaUsed: {$lte: max - media.size }}, { $inc: { mediaUsed: media.size }});

			// Return if there wasn't enough space.
			if (ret.value == null) return MediaStatus.MEDIA_LIMIT;

			const ext = media.name.substr(media.name.lastIndexOf("."));
			const fullPath = path.join(this.dataPath, "media", identifier + ext);

			try { await fs.access(fullPath, fsc.R_OK); return MediaStatus.EXISTS; } catch (e) {}

			await media.mv(fullPath);

			const mediaEntry: DB.Media = {
				name: name,
				identifier: identifier,
				path: fullPath,
				ext: ext.substr(1),
				size: media.size,
				uploadUser: user,
				uploadDate: Date.now(),
				publicPath: `/media/${identifier}${ext}`
			}

			await this.db!.collection('media').insertOne(mediaEntry);
			return MediaStatus.OK;
		}
		catch(e) {
			console.log(e);
			return MediaStatus.INVALID;
		}
	}


	/**
	* Delete a series of media objects from the database.
	* 
	* @param {string[]} identifiers - A list of media identifiers to delete.
	*/

	async deleteMedia(identifiers: string[]) {
		const media = this.db!.collection('media');

		const docs = await (await media.find({identifier: { $in: identifiers }})).toArray();
		await media.deleteMany({identifier: { $in: identifiers }});

		// Delete all of the files.
		await Promise.all(docs.map((d) => fs.unlink(d.path)));
	}


	/**
	* Returns a list of all elements.
	*/

	async listElements(): Promise<DB.Element[]> {
		return await (await this.db!.collection('elements').find({})).toArray();
	}


	/**
	* Create a new element with the specified props and add it to the database.
	* Throws if the identifier is in use.
	*
	* @param {string} identifier  - The unique identifier for the element, must pass sanitize.
	* @param {string} elementType - The type of the element, must be a valid type in the elements list.
	* @param {string} properties  - A valid JSON string containing the element properties.
	*/

	async createElement(identifier: string, elementType: string, properties: string) {
		const elements = this.db!.collection('elements');
		
		if (await elements.findOne({identifier: identifier})) 
			throw "An element with that identifier already exists in the database.";

		elements.insertOne({
			identifier: identifier,
			type: elementType,
			props: properties
		} as DB.Element);
	}


	/**
	* Returns a PartialSiteData object from the database.
	* Used for the client admin site to show information.
	*/

	async getSiteData(specifier?: string): Promise<PartialSiteData> {
		const specifiers = (specifier ? specifier.split('&') as SiteDataSpecifier[] : []);

		let data: PartialSiteData = {};

		data = (specifiers.includes('info')) ? 
			Object.assign(data, await this.db!.collection('siteinfo').findOne({}) as PartialSiteData) : data;

		if (specifiers.includes('media')) data.media = 
			await (await this.db!.collection('media').find({})).toArray();

		if (specifiers.includes('themes')) data.themes = 
			await (await this.db!.collection('themes').find({})).toArray();
		
		if (specifiers.includes('plugins')) data.plugins = 
			await (await this.db!.collection('plugins').find({})).toArray();

		if (specifiers.includes('elements')) data.elements = 
			await (await this.db!.collection('elements').find({})).toArray();

		return data;
	}


	/**
	* Get a User database object from a user user.
	* Throws if the user doesn't exist.
	*
	* @param {string} user - The username.
	*/

	async getAccount(user: string): Promise<DB.Account> {
		const accounts = this.db!.collection('accounts');
		const accountObj: DB.Account | null = await accounts.findOne({identifier: user});
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
		if (await accounts.findOne({identifier: user}) != null) throw "This user already already exists.";

		let pass = await bcrypt.hash(password, 10);
		await accounts.insertOne({identifier: user, pass: pass, super: superUser});
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
		await accounts.updateOne({ identifier: user }, { $set: { pass: pass }});
	}


	/**
	* Deletes an account.
	*
	* @param {string} user - The account to delete.
	*/

	async deleteAccount(user: string) {
		const accounts = this.db!.collection('accounts');
		await accounts.deleteOne({ identifier: user });
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
		return (await accounts.find({}, {projection: {identifier: 1}}).toArray()).map((a: DB.Account) => a.identifier);
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
		const accountObj: DB.Account | null = await accounts.findOne({identifier: user});

		if (!accountObj || !await bcrypt.compare(password, accountObj.pass)) throw "Incorrect username or password.";

		const buffer = await crypto.randomBytes(48);
		const token = buffer.toString('hex');

		const tokens = this.db!.collection('tokens');
		const tkn = {identifier: accountObj.identifier, token: token, expires: (Date.now() / 1000) + 60 * 60 * 24 * 3};
		await tokens.insertOne(tkn);

		return token;
	}

	/**
	* Returns the user identifier that a token points to when provided with a
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
		
		return inst.identifier;
	}


	/**
	* Prune authentication tokens that are past their expiry date.
	*/

	private async pruneTokens() {
		const users = (await (await this.db!.collection('accounts').find({}, 
			{projection: {identifier: 1}}).toArray()).map((u: DB.Account) => u.identifier));

		await this.db!.collection('tokens').deleteMany(
			{$or: [{expires: { $lt: (Date.now() / 1000)}}, {identifier: { $nin: users }}]});
	}
}
