import * as fs from 'fs';
import log4js from 'log4js';
import debounce from 'debounce';

import Config from './PluginConfig';
import Elements from '../../Elements';
import Bindings from './PluginBindings';

const logger = log4js.getLogger();


/**
 * Represents a single plugin.
 */

export default class Plugin {
	private enabled: boolean = false;
	private bindings = new Bindings();

	private watcher: fs.FSWatcher | undefined = undefined;
	private debounceRefresh = debounce(() => {
		logger.debug('Reloading plugin %s.', this.config.identifier);
		this.disable(false);
		this.enable();
	}, 200);

	constructor(readonly config: Config, private indexPath: string, private elements: Elements) {}


	/**
	 * Checks if this plugin is enabled or not.
	 *
	 * @returns a boolean indicating if the plugin is enabled.
	 */

	isEnabled(): boolean {
		return this.enabled;
	}


	/**
	 * Enables this plugin.
	 */

	enable() {
		if (this.enabled) return;
		this.enabled = true;

		delete require.cache[this.indexPath];
		require(this.indexPath)(this.bindings);
		this.elements.addList(this.bindings.elements);

		if (true) this.watch();
	}


	/**
	 * Disables this plugin.
	 *
	 * @param {boolean} stopWatch - Whether or not the watcher should be unbound. Default true.
	 */

	disable(stopWatch: boolean = true) {
		if (!this.enabled) return;
		this.enabled = false;
		this.elements.removeList(this.bindings.elements);
		if (stopWatch) {
			this.watcher?.close();
			this.watcher = undefined;
		}
	}


	/**
	 * Watches the plugin's directory for changes, reloading if it finds any.
	 */

	private watch() {
		if (this.watcher) return;
		this.watcher = fs.watch(this.indexPath, { persistent: false, recursive: false, encoding: 'utf8'}, this.debounceRefresh);
		logger.debug('Watching plugin %s for changes.', this.config.identifier);
	}
}
