import { Long } from 'mongodb';
import Mongoose from 'mongoose';


/**
 * A temporary authentication token for a single user.
 */

export interface IProperties extends Mongoose.Document {
	info: {
		name: string;
		description: string;
		domain: string;
		favicon: Long;
	};
	usage: {
		media_allocated: number;
		media_used: number;
	};
	enabled: {
		themes: string[];
		plugins: string[];
	};
}

export const PropertiesSchema = new Mongoose.Schema<IProperties>({
	info: {
		name: { type: String, default: '' },
		description: { type: String, default: '' },
		domain: { type: String, default: '' },
		favicon: { type: {} }
	},
	usage: {
		media_allocated: { type: Number, required: true },
		media_used: { type: Number, default: 0 }
	},
	enabled: {
		themes: { type: [String], required: true },
		plugins: { type: [String], required: true }
	}
});

export default Mongoose.model('Properties', PropertiesSchema);
