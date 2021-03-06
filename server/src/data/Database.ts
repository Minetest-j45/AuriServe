import log4js from 'log4js';
import { Long } from 'mongodb';
import Mongoose from 'mongoose';
import { UniqueID } from 'nodejs-snowflake';

import Properties from './model/Properties';

const logger = log4js.getLogger();

export const snowflake = () => Long.fromString(new UniqueID().getUniqueID() as string);

export const init = async (url: string, db: string) => {
	Mongoose.set('useFindAndModify', false);
	await Mongoose.connect(url + '/' + db, { useNewUrlParser: true, useUnifiedTopology: true });
	logger.debug('Connected to Mongoose successfully.');

	if (!await Properties.findOne({})) await Properties.create({ usage: { media_allocated: 1024 * 1024 * 1024 } });
};
