import crypto from 'crypto';
import { Long } from 'mongodb';

import { snowflake } from './Database';

import User from './model/User';
import AuthToken from './model/AuthToken';

/** The time in ms that a token must be idle for it to expire. */
export const TOKEN_TIMEOUT = 1000 * 60 * 60 * 24 * 3;

/** The time in ms between token purges. */
export const PURGE_INTERVAL = 1000 * 60 * 15;

/** The time of last token purge. */
let lastPurge = 0;


/**
 * Accepts a username and password and, if they are valid, creates or renews an access token.
 *
 * @param {string} username - The user's username.
 * @param {string} password - The user's password in plaintext.
 * @returns the token string.
 */

export const getToken = async (username: string, password: string) => {
	const user = await User.findOne({ username });
	if (!user || !await user.passwordEquals(password)) throw 'Incorrect username or password';

	return (await AuthToken.findOneAndUpdate({ user: user._id }, {
		$set: { until: Date.now() + TOKEN_TIMEOUT },
		$setOnInsert: {
			_id: snowflake(),
			user: user._id, token: (await crypto.randomBytes(48)).toString()
		}
	}, { upsert: true, new: true }))!.token;
};


/**
 * Purges authentication tokens that are expired, or that no longer belong to a user.
 * Updates the lastPurge variable to the current time.
 *
 * @returns a promise indicating that the purge is complete.
 */

export const purgeExpiredTokens = async () => {
	const now = Date.now();
	lastPurge = now;
	const users = (await User.find({}, '_id')).map(u => u._id);
	await AuthToken.deleteMany({ $or: [ { until: { $lt: now } }, { _id: { $nin: users } } ] });
};


/**
 * Tests a token against the database and, if valid, returns the user associated with it.
 *
 * @param {string} token - The token string to test.
 * @returns a user document, or null if the token is invalid.
 */

export const testToken = async (token: string) => {
	if (Date.now() - lastPurge > PURGE_INTERVAL) purgeExpiredTokens();
	const id = (await AuthToken.findOne({ token, until: { $gte: Date.now() } }))?.user;
	if (!id) return null;
	return User.findById(id);
};


/**
 * Removes all authentication tokens for the specified user, effectively logging them out.
 *
 * @param {Long} id - The user id to log out.
 * @returns a boolean indicating if any tokens were removed.
 */

export const removeTokensForUser = async (id: Long) => (await AuthToken.deleteMany({ user: id })).deletedCount > 0;


/**
 * Gets a user document from its id.
 *
 * @param {Long} id - The user's snowflake.
 * @returns the user document, or null if there is no user with that id.
 */

export const getUser = async (id: Long) => User.findById(id);


/**
 * Adds a new user to the database.
 *
 * @param {string} username - The user's username. May contains spaces and special characters.
 * @param {string} password - The user's password in plaintext.
 * @returns the newly created user document.
 */

export const addUser = async (username: string, password: string) => {
	return User.create({
		_id: snowflake(),

		username,
		password,
		emails: [],
		roles: []
	});
};


/**
 * Removes a user from the database by its id.
 *
 * @param {Long} id - The user's snowflake.
 * @returns the deleted user document, or null if there was no user with that id.
 */

export const removeUser = async (id: Long) => {
	removeTokensForUser(id);
	return User.findByIdAndDelete(id);
};


/**
 * Gets a list of all user documents.
 *
 * @returns an array of all user documents.
 */

export const listUsers = async () => User.find({});
