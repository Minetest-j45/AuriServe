import { Long } from 'mongodb';
import Mongoose from 'mongoose';

export interface IUser extends Mongoose.Document {
	_id: Long;

	username: string;
	passwordHash: string;
	emails: string[];
	roles: string[];
}

export const UserSchema = new Mongoose.Schema<IUser>({
	_id: { type: {}, required: true },

	username: { type: String, required: true },
	passwordHash: { type: String, required: true },
	emails: { type: [String], required: true },
	role: { type: [String], required: true }
}, { id: false });

UserSchema.virtual('id').get(function(this: IUser) { return this._id; });

export default Mongoose.model('User', UserSchema);
