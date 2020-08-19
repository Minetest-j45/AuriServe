import path from 'path';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import log4js from "log4js";
import { UploadedFile } from "express-fileupload";
import { MongoClient, Db } from 'mongodb';
import { promises as fs, constants as fsc } from 'fs';

import * as DB from '../../common/DBStructs';
import sanitize from '../../common/util/Sanitize';

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

			// await this.db.collection('siteinfo').deleteMany({});
			if (!await this.db.collection('siteinfo').findOne({})) {
				const siteInfo: DB.SiteInfo = {
					domain: "example.com",
					sitename: "Example",

					mediaMax: 1*1024*1024*1024,
					mediaUsed: 0,

					activeThemes: [],
				}

				await this.db.collection('siteinfo').insertOne(siteInfo);
			}

			await this.refreshThemes();

			// await this.db.collection('media').deleteMany({});
		}
		catch (e) {
			logger.fatal("Failed to connect to MongoDB instance %s with database %s.\n %s", url, db, e);
			process.exit(1);
		}
	}


	/**
	* Scans the themes directory and 
	* updates the themes collection to match.
	*/

	async refreshThemes() {
		const themes = this.db!.collection('themes');
		themes.deleteMany({});

		let themesLoaded = 0;
		let themesErrored = 0;

		const files = await fs.readdir(path.join(this.dataPath, "themes"));

		await Promise.all(files.map(async f => {
			try {
				if (sanitize(f) != f) throw `Failed to parse theme ${f}, theme directory must be lowercase alphanumeric.`;

				let conf: DB.Theme;
				const confStr = (await fs.readFile(path.join(this.dataPath, "themes", f, "conf.json"))).toString();
				
				try { conf = JSON.parse(confStr); }
				catch (e) { throw `Failed to parse configuration file for theme ${f}.\n ${e}`; }

				let cover = true;
				try { await fs.access(path.join(this.dataPath, "themes", f, "cover.jpg"), fsc.R_OK); }
				catch (e) { cover = false; }

				await themes.insertOne({
					identifier: f,

					name: conf.name || f,
					description: conf.description || "",
					author: conf.author || "Unauthored",
					
					hasCover: cover,

					pre: conf.pre || ""
				});

				themesLoaded++;
			}
			catch (e) {
				if (typeof(e) == "string") logger.warn(e);
				else if (e.code == 'ENOTDIR') logger.warn("Failed to load theme %s, not a directory.", f);
				else if (e.code == 'ENOENT') logger.warn("Failed to load theme %s, missing conf.json.", f);
				else logger.warn(e);

				themesErrored++;
			}
		}));

		let log = "Parsed " + themesLoaded + " theme" + (themesLoaded > 1 ? "s" : "");
		if (themesErrored) log += ", failed to parse " + themesErrored + " theme" + (themesErrored > 1 ? "s" : "");
		else log += ".";

		logger.info(log);
	}

	/**
	* Toggles the listed themes based on their identifiers.
	*
	* @param {string[]} identifiers - Themes to toggle
	*/

	async toggleThemes(themes: string[]) {
		let info = this.db!.collection("siteinfo");

		let activeThemes: string[] = (await info.findOne({})).activeThemes;
		
		for (let theme of themes) {
			if (activeThemes.indexOf(theme) != -1) activeThemes.splice(activeThemes.indexOf(theme), 1);
			else activeThemes.push(theme);
		}

		info.updateOne({}, { $set: { activeThemes: activeThemes }});
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
			const max = (await siteinfo.findOne({})).media_max;
			const ret = await this.db!.collection('siteinfo').findOneAndUpdate(
				{media_used: {$lte: max - media.size }}, { $inc: { media_used: media.size }});
				
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
	* Get a SiteData object from the database.
	* Used for the client admin site to show information.
	*/

	async getSiteData(): Promise<DB.SiteInfo> {
		let info =  await this.db!.collection('siteinfo').findOne({});
		const media = await (await this.db!.collection('media').find({})).toArray();
		const themes = await (await this.db!.collection('themes').find({})).toArray();
		
		info.media = media;
		info.themes = themes;

		return info;
	}


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
}
