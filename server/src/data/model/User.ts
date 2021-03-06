import bcrypt from 'bcryptjs';
import { Long } from 'mongodb';
import Mongoose from 'mongoose';

import { snowflake } from '../Database';


/**
 * A user with access to the administrator interface.
 */

export interface IUser extends Mongoose.Document {
	_id: Long;

	username: string;
	passwordHash: string;
	emails: string[];
	roles: string[];

	passwordEquals(password: string): boolean;
}

const UserSchema = new Mongoose.Schema<IUser>({
	_id: { type: {}, default: snowflake },

	username: { type: String, required: true },
	passwordHash: { type: String, required: true },
	emails: { type: [String], required: true },
	role: { type: [String], required: true }
});


/**
 * Sets the passwordHash of the User to the serialized hash of the password provided.
 *
 * @param {string} password - The password to set the hash to.
 */

UserSchema.virtual('password').set(function(this: IUser, password: string) {
	this.passwordHash = bcrypt.hashSync(password, 10);
});


/**
 * Checks if the provided password is this User's password.
 *
 * @param {string} password - The password to check.
 * @returns a promise indicating if the password is equal to the hashed password in the document.
 */

UserSchema.method('passwordEquals', function(this: IUser, password: string) {
	return bcrypt.compare(password, this.passwordHash);
});

export default Mongoose.model('User', UserSchema);
