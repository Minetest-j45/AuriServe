import { Long } from 'mongodb';
import Mongoose from 'mongoose';

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
	_id: { type: {}, required: true },

	token: { type: String, required: true },
	user: { type: {}, required: true },
	until: { type: Number, required: true }
}, { id: false });

export default Mongoose.model('AuthToken', AuthTokenSchema);
