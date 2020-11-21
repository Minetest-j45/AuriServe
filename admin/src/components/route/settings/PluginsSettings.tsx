import * as Preact from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { useSiteData } from '../../../Hooks';

import { Label } from '../../input/Input';
import SaveConfirmationModal from '../../SaveConfirmationModal';

import { Plugin } from '../../../../../common/interface/DBStructs';


import './PluginsSettings.sass';

function PluginItem({ plugin, active, onClick }: { plugin: Plugin; active: boolean; onClick: () => any }) {
	return (
		<li class='PluginsSettings-PluginItemWrap' key={plugin.identifier}>
			<button class='PluginsSettings-PluginItem' onClick={onClick}>
				<div class='PluginsSettings-PluginItem-Cover'>
					{plugin.hasCover && <img src={'/admin/plugins/cover/' + plugin.identifier + '.jpg'} alt=''/>}
					<span class={'PluginsSettings-PluginItem-Tag ' + (active ? 'Enabled' : 'Disabled')}>
						{active ? 'Enabled' : 'Disabled'}
					</span>
				</div>

				<div class='PluginsSettings-PluginItem-Content'>
					<h2 class='PluginsSettings-PluginItem-Title'>{plugin.name}</h2>
					<p class='PluginsSettings-PluginItem-Author'>{plugin.author}</p>
					<p class='PluginsSettings-PluginItem-Description'>{plugin.description}</p>
				</div>
			</button>
		</li>
	);
}

export default function PluginsSettings() {
	const [ { plugins, enabledPlugins: ctxEnabled },, mergeData ] = useSiteData('themes');

	const [ enabledPlugins, setEnabledPlugins ] = useState<string[]>(ctxEnabled ?? []);
	useEffect(() => setEnabledPlugins(ctxEnabled ?? []), [ ctxEnabled ]);

	const enabled = (plugins || []).filter((theme) => (enabledPlugins || []).includes(theme.identifier))
		.sort((a, b) => a.identifier < b.identifier ? -1 : 1);
	const disabled = (plugins || []).filter((theme) => !enabled.includes(theme))
		.sort((a, b) => a.identifier < b.identifier ? -1 : 1);

	const isDirty = JSON.stringify((ctxEnabled || []).sort((a, b) => a < b ? -1 : 1)) !== JSON.stringify(enabledPlugins);

	const handleToggle = (toggle: string) => {
		let newEnabled = [ ...enabledPlugins ];
		if (newEnabled.includes(toggle)) newEnabled.splice(newEnabled.indexOf(toggle), 1);
		else newEnabled.push(toggle);
		setEnabledPlugins(newEnabled.sort((a, b) => a < b ? -1 : 1));
	};

	const handleSave = async () => {
		const r = await fetch('/admin/plugins/update', {
			method: 'POST', cache: 'no-cache',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(enabledPlugins)
		});
		mergeData(await r.json());
	};

	return (
		<div class='Settings PluginsSettings'>
			<Label label='Enabled Plugins' />
			<ul class='PluginsSettings-PluginsList'>
				{enabled.map((plugin) => <PluginItem plugin={plugin} active={true}  onClick={() => handleToggle(plugin.identifier)}/>)}
				{!enabled.length && <div class='PluginsSettings-PluginsListEmpty'>
					<h2>No enabled plugins.</h2>
					<p>Try refreshing if you believe this is an error.</p>
				</div>}
			</ul>

			<Label label='Disabled Plugins' />
			<ul class='PluginsSettings-PluginsList'>
				{disabled.map((plugin) => <PluginItem plugin={plugin} active={false} onClick={() => handleToggle(plugin.identifier)}/>)}
				{!disabled.length && <div class='PluginsSettings-PluginsListEmpty'>
					<h2>No disabled plugins.</h2>
					<p>Try refreshing if you believe this is an error.</p>
				</div>}
			</ul>

			<SaveConfirmationModal active={isDirty} onSave={handleSave} onReset={() => setEnabledPlugins(ctxEnabled || [])} />
		</div>
	);
}
