import log4js from 'log4js';
import { Long } from 'mongodb';
import Mongoose from 'mongoose';
import { UniqueID } from 'nodejs-snowflake';

// import User from './schema/User';

const logger = log4js.getLogger();

export default class Database {
	readonly db: Mongoose.Connection = Mongoose.connection;

	public static snowflake = () => Long.fromString(new UniqueID().getUniqueID() as string);

	async init(url: string, db: string) {
		Mongoose.set('useFindAndModify', false);
		await Mongoose.connect(url + '/' + db, { useNewUrlParser: true, useUnifiedTopology: true });
		logger.debug('Connected to Mongoose successfully.');

		// const u = await User.create({
		// 	_id: Database.snowflake(),

		// });

		// console.log(u);
	}
}
