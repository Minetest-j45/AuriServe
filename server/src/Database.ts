import path from 'path';
import crypto from 'crypto';
import log4js from 'log4js';
import bcrypt from 'bcryptjs';
import { MongoClient, Db } from 'mongodb';
import { UploadedFile } from 'express-fileupload';
import { promises as fs, constants as fsc } from 'fs';

import { Database as DB, SiteData, SiteDataSpecifier } from 'auriserve-api';

const logger = log4js.getLogger();

export enum MediaStatus {
	OK,
	INVALID,
	EXISTS,
	MEDIA_LIMIT
}

export default class Database {
	private client: MongoClient | null = null;
	private db: Db | null = null;

	constructor(private dataPath: string) {	}

	async init(url: string, db: string) {
		this.client = new MongoClient(url, { useUnifiedTopology: true });

		try {
			await this.client.connect();
			logger.debug('Connected to MongoDB successfully.');

			this.db = this.client.db(db);

			if (!await this.db.collection('siteinfo').findOne({})) {
				await this.db.collection('siteinfo').insertOne({
					domain: 'example.com',
					sitename: 'Example',
					favicon: '',
					description: '',

					mediaMax: 1024 * 1024 * 1024,
					mediaUsed: 0,

					enabledThemes: [],
					enabledPlugins: []
				} as DB.SiteInfo);
			}

			if (!await this.db.collection('roles').findOne({ identifier: 'Administrator' })) {
				await this.db.collection('roles').insertMany([{
					identifier: 'Administrator',
					abilities: [ 'ADMINISTRATOR' ],
					color: { h: 0.588, s: 0.96, v: 0.82 }
				}, {
					identifier: 'Editor',
					abilities: [ 'VIEW_AUDIT_LOG', 'VIEW_PAGES', 'MANAGE_PAGES', 'EDIT_PAGES', 'VIEW_MEDIA',
						'MANAGE_MEDIA', 'VIEW_THEMES', 'MANAGE_THEMES', 'TOGGLE_THEMES' ]
				}, {
					identifier: 'Writer',
					abilities: [ 'VIEW_PAGES', 'EDIT_PAGES', 'VIEW_MEDIA' ]
				}]);
			}
		}
		catch (e) {
			logger.fatal('Failed to connect to MongoDB instance %s with database %s.\n %s', url, db, e);
			process.exit(1);
		}
	}


	/**
	 * Sets the site information (name, domain, description)
	 * to the data object provided.
	 */

	async setInfo(newInfo: Partial<DB.SiteInfo>) {
		let info = this.db!.collection('siteinfo');
		await info.updateOne({}, { $set: newInfo });
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
	 */

	async getEnabledPlugins(): Promise<string[]> {
		let info = this.db!.collection('siteinfo');
		let themes = await info.findOne({}, { projection: { enabledPlugins: 1 }});
		return themes.enabledPlugins || [];
	}


	/**
	 * Sets the active plugins to the string provided.
	 *
	 * @param {string[]} plugins - Plugins to be activated.
	 */

	async setEnabledPlugins(plugins: string[]) {
		let info = this.db!.collection('siteinfo');
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
	 * @param {Theme[]} themes - The themes to populate the array with.
	 */

	async setThemes(themes: DB.Theme[]) {
		const collection = this.db!.collection('themes');
		await collection.deleteMany({});
		if (themes.length) await collection.insertMany(themes);
	}


	/**
	 * Returns the enabled themes.
	 */

	async getEnabledThemes(): Promise<string[]> {
		let info = this.db!.collection('siteinfo');
		let themes = await info.findOne({}, { projection: { enabledThemes: 1 }});
		return themes.enabledThemes || [];
	}


	/**
	 * Sets the enabled themes to the string provided.
	 *
	 * @param {string[]} themes - Themes to be activated.
	 */

	async setEnabledThemes(themes: string[]) {
		let info = this.db!.collection('siteinfo');
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

			const ext = media.name.substr(media.name.lastIndexOf('.'));
			const fullPath = path.join(this.dataPath, 'media', identifier + ext);

			try { await fs.access(fullPath, fsc.R_OK); return MediaStatus.EXISTS; }
			catch (e) { /* This error indicates that there is no file conflict. */ }

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
			};

			await this.db!.collection('media').insertOne(mediaEntry);
			return MediaStatus.OK;
		}
		catch(e) {
			console.log(e);
			return MediaStatus.INVALID;
		}
	}


	/**
	 * Replace a media asset with a new file.
	 *
	 * @param {string} user - The uploading user.
	 * @param {UploadedFile} item - The file to accept.
	 * @param {string} replace - Media identifier to replace.
	 */

	async replaceMedia(user: string, item: UploadedFile, replace: string): Promise<MediaStatus> {
		try {
			const media = this.db!.collection('media');
			const siteinfo = this.db!.collection('siteinfo');

			const existing = await media.findOne({ identifier: replace }) as any as DB.Media;
			if (!existing) return MediaStatus.INVALID;
			delete existing._id;

			// Make sure there is space in the server for
			// the media, and update the media used value.
			const sizeDiff = item.size - existing.size;
			const max = (await siteinfo.findOne({})).mediaMax;
			const ret = await siteinfo.findOneAndUpdate(
				{mediaUsed: {$lte: max - sizeDiff }}, { $inc: { mediaUsed: sizeDiff }});

			// Return if there wasn't enough space.
			if (ret.value == null) return MediaStatus.MEDIA_LIMIT;

			const ext = item.name.substr(item.name.lastIndexOf('.'));
			const p = path.join(path.dirname(existing.path), replace + ext);
			await media.deleteOne({ identifier: replace });
			await fs.unlink(existing.path);
			await item.mv(p);

			existing.path = p;
			existing.ext = ext.substr(1);
			existing.size = item.size;
			existing.uploadUser = user;
			existing.uploadDate = Date.now();
			existing.publicPath = `/media/${replace}${ext}`;

			await media.insertOne(existing);
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

		let freedSpace = docs.map(d => d.size).reduce((a, b) => a + b);
		await this.db!.collection('siteinfo').findOneAndUpdate(
			{}, { $inc: { mediaUsed: -freedSpace }});

		// Delete all of the files.
		await Promise.all(docs.map((d) => fs.unlink(d.path)));
	}


	/**
	 * Replaces all roles in the DB with the updated set.
	 *
	 * @param {Role[]} newRoles - New roles
	 */

	async updateRoles(newRoles: DB.Role[]) {
		const roles = this.db!.collection('roles');
		await roles.deleteMany({});
		await roles.insertMany(newRoles);
	}


	/**
	 * Adds the specified roles to a user's roles list.
	 *
	 * @param {string} user - The user to add the roles to.
	 * @param {string[]} roles - The roles to add to the user.
	 */

	async userAddRoles(user: string, roles: string[]) {
		let success = !!(await this.db!.collection('accounts')
			.updateOne({ identifier: user }, { $addToSet: { roles: { $each: roles } }})).matchedCount;
		if (!success) throw 'This user no longer exists';
	}


	/**
	 * Removes the specified roles from a user's roles list.
	 *
	 * @param {string} user - The user to remove the roles from.
	 * @param {string[]} roles - The roles to remove from the user.
	 */

	async userRemoveRoles(user: string, roles: string[]) {
		let success = !!(await this.db!.collection('accounts')
			.updateOne({ identifier: user }, { $pull: { roles: { $in: roles } }})).matchedCount;
		if (!success) throw 'This user no longer exists';
	}


	/**
	 * Returns a PartialSiteData object from the database.
	 * Used for the client admin site to show information.
	 *
	 * @param {string} specifier - A ampersand-separated string containing one or more specifiers.
	 *
	 * Specifiers:
	 * info - Basic state and enabled themes and plugins.
	 * roles - Role listings
	 * users - User listings
	 * media - Media listings
	 * themes - Theme listings
	 * plugins - Plugin listings
	 */

	async getSiteData(specifier?: string): Promise<Partial<SiteData>> {
		const specifiers = (specifier ? specifier.split('&') as SiteDataSpecifier[] : []);

		let data: Partial<SiteData> = {};

		data = (specifiers.includes('info')) ?
			Object.assign(data, await this.db!.collection('siteinfo').findOne({}) as Partial<SiteData>) : data;

		if (specifiers.includes('media')) data.media =
			await (await this.db!.collection('media').find({})).toArray();

		if (specifiers.includes('roles')) data.roles =
			await (await this.db!.collection('roles').find({})).toArray();

		if (specifiers.includes('themes')) data.themes =
			await (await this.db!.collection('themes').find({})).toArray();

		if (specifiers.includes('plugins')) data.plugins =
			await (await this.db!.collection('plugins').find({})).toArray();

		if (specifiers.includes('users')) {
			let users = await (await this.db!.collection('accounts').find({})).toArray();
			users.forEach((u) => delete u.pass);
			data.users = users;
		}

		return data;
	}


	/**
	 * Get a User database object from a user user.
	 * Throws if the user doesn't exist.
	 *
	 * @param {string} user - The username.
	 */

	async getAccount(user: string): Promise<DB.User> {
		const accounts = this.db!.collection('accounts');
		const accountObj: DB.User | null = await accounts.findOne({identifier: user});
		if (!accountObj) throw 'This user no longer exists.';

		return accountObj;
	}


	/**
	 * Create a user in the database from a user object.
	 * This function DOES NOT SANITIZE the user object, make sure that it is safe.
	 * Throws if another user with the same user string already exists.
	 *
	 * @param {string} user - A DB.User object with an unhashed password.
	 */

	async createAccount(user: Omit<DB.User, 'id'>) {
		const accounts = this.db!.collection('accounts');
		if (await accounts.findOne({identifier: user.identifier}) != null)
			throw 'A user with this identifier already exists.';

		user.pass = await bcrypt.hash(user.pass, 10);
		await accounts.insertOne(user);
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
	 * Lists all of the accounts
	 */

	async listAccounts() {
		const accounts = this.db!.collection('accounts');
		return (await accounts.find({}, {projection: {identifier: 1}}).toArray()).map((a: DB.User) => a.identifier);
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
		const accountObj: DB.User | null = await accounts.findOne({identifier: user});

		if (!accountObj || !await bcrypt.compare(password, accountObj.pass)) throw 'Incorrect username or password.';

		const buffer = await crypto.randomBytes(48);
		const token = buffer.toString();

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
		if (typeof token !== 'string') {
			if (!token.cookies || !token.cookies.tkn || typeof token.cookies.tkn != 'string')
				throw 'Auth token is no longer valid, please reload the page.';
			token = token.cookies.tkn;
		}

		await this.pruneTokens();
		let inst: DB.AuthToken | null = await this.db!.collection('tokens').findOne({token: token});
		if (!inst) throw 'Auth token is no longer valid, please reload the page.';

		return inst.identifier;
	}


	/**
	 * Prune authentication tokens that are past their expiry date.
	 */

	private async pruneTokens() {
		const users = (await (await this.db!.collection('accounts').find({},
			{projection: {identifier: 1}}).toArray()).map((u: DB.User) => u.identifier));

		await this.db!.collection('tokens').deleteMany(
			{$or: [{expires: { $lt: (Date.now() / 1000)}}, {identifier: { $nin: users }}]});
	}
}
