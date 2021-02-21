import { Long } from 'mongodb';
import Mongoose from 'mongoose';

import { snowflake } from '../Database';


/**
 * A temporary authentication token for a single user.
 */

export interface IAuthToken extends Mongoose.Document {
	_id: Long;

	token: string;
	user: Long;
	until: number;
}

export const AuthTokenSchema = new Mongoose.Schema<IAuthToken>({
	_id: { type: {}, default: snowflake },

	token: { type: String, required: true },
	user: { type: {}, required: true },
	until: { type: Number, required: true }
});

export default Mongoose.model('AuthToken', AuthTokenSchema);
