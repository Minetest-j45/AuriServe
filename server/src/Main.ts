import path from 'path';
import { promises as fs, constants as fsc } from 'fs';

import log4js from 'log4js';
import minimist from 'minimist';

import Server from './Server';
import resolvePath from '../../common/util/ResolvePath';
import { Config, mergeConfig } from './interface/Config';

const DEFAULT_DATA_DIR = 'site-data';
const DEFAULT_CONF_FILENAME = 'conf.json';

// Initialize the logger.
const logger = log4js.getLogger();

// Don't allow unhandled Promise rejections.
process.on('unhandledRejection', up => { logger.fatal('Unhandled promise rejection.'); throw up; });

async function start() {
	const args = minimist(process.argv.slice(2)) as any;

	// Find the Configuration file.
	let confPath = resolvePath(
		args.conf ? args.conf :
		args.data ? path.join(args.data, DEFAULT_CONF_FILENAME) :
		path.join(DEFAULT_DATA_DIR, DEFAULT_CONF_FILENAME));

	// Parse the config into conf.
	let conf: Config | null;

	try {
		const file = (await fs.readFile(confPath)).toString();
		conf = mergeConfig(JSON.parse(file), args);
	}
	catch (e) {
		logger.level = 'debug';
		logger.fatal('Failed to parse configuration file \'%s\'.\n %s', confPath, e);
		process.exit(1);
	}

	logger.level = conf.verbose ? 'debug' : conf.logLevel ?? 'info';

	// Find the site data folder.
	let dataPath = resolvePath(conf.data ?? DEFAULT_DATA_DIR);

	logger.debug('Initializing AuriServe with data directory \'%s\' and configuration file \'%s\'.', dataPath, confPath);

	try {
		await fs.access(dataPath, fsc.R_OK);
	}
	catch (e) {
		logger.fatal('Failed to access data directory \'%s\'.\n %s', dataPath, e);
		process.exit(1);
	}

	// Start the Server.
	try {
		new Server(conf, dataPath);
	}
	catch (e) {
		logger.fatal('Unhandled Server Exception!\n %s', e);
		process.exit(1);
	}
}

// Initialize AuriServe.
start();
