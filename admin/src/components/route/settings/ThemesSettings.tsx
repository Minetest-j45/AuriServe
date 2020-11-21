import * as Preact from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { useSiteData } from '../../../Hooks';

import { Label } from '../../input/Input';
import SaveConfirmationModal from '../../SaveConfirmationModal';

import { Theme } from '../../../../../common/interface/DBStructs';


import './ThemesSettings.sass';

function ThemeItem({ theme, active, onClick }: { theme: Theme; active: boolean; onClick: () => any }) {
	return (
		<li class='ThemesSettings-ThemeItemWrap' key={theme.identifier}>
			<button class='ThemesSettings-ThemeItem' onClick={onClick}>
				<div class='ThemesSettings-ThemeItem-Cover'>
					{theme.hasCover && <img src={'/admin/themes/cover/' + theme.identifier + '.jpg'} alt=''/>}
					<span class={'ThemesSettings-ThemeItem-Tag ' + (active ? 'Enabled' : 'Disabled')}>
						{active ? 'Enabled' : 'Disabled'}
					</span>
				</div>

				<div class='ThemesSettings-ThemeItem-Content'>
					<h2 class='ThemesSettings-ThemeItem-Title'>{theme.name}</h2>
					<p class='ThemesSettings-ThemeItem-Author'>{theme.author}</p>
					<p class='ThemesSettings-ThemeItem-Description'>{theme.description}</p>
				</div>
			</button>
		</li>
	);
}

export default function ThemesSettings() {
	const [ { themes, enabledThemes: ctxEnabled },, mergeData ] = useSiteData('themes');

	const [ enabledThemes, setEnabledThemes ] = useState<string[]>(ctxEnabled ?? []);
	useEffect(() => setEnabledThemes(ctxEnabled ?? []), [ ctxEnabled ]);

	const enabled = (themes || []).filter((theme) => (enabledThemes || []).includes(theme.identifier))
		.sort((a, b) => a.identifier < b.identifier ? -1 : 1);
	const disabled = (themes || []).filter((theme) => !enabled.includes(theme))
		.sort((a, b) => a.identifier < b.identifier ? -1 : 1);

	const isDirty = JSON.stringify((ctxEnabled || []).sort((a, b) => a < b ? -1 : 1)) !== JSON.stringify(enabledThemes);

	const handleToggle = (toggle: string) => {
		let newEnabled = [ ...enabledThemes ];
		if (newEnabled.includes(toggle)) newEnabled.splice(newEnabled.indexOf(toggle), 1);
		else newEnabled.push(toggle);
		setEnabledThemes(newEnabled.sort((a, b) => a < b ? -1 : 1));
	};

	const handleSave = async () => {
		const r = await fetch('/admin/themes/update', {
			method: 'POST', cache: 'no-cache',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(enabledThemes)
		});
		mergeData(await r.json());
	};
	
	return (
		<div class='Settings ThemesSettings'>
			<Label label='Enabled Themes' />
			<ul class='ThemesSettings-ThemesList'>
				{enabled.map((theme) => <ThemeItem theme={theme} active={true} onClick={() => handleToggle(theme.identifier)}/>)}
				{!enabled.length && <div class='ThemesSettings-ThemesListEmpty'>
					<h2>No enabled themes.</h2>
					<p>Try refreshing if you believe this is an error.</p>
				</div>}
			</ul>
			
			<Label label='Disabled Themes' />
			<ul class='ThemesSettings-ThemesList'>
				{disabled.map((theme) => <ThemeItem theme={theme} active={false} onClick={() => handleToggle(theme.identifier)} />)}
				{!disabled.length && <div class='ThemesSettings-ThemesListEmpty'>
					<h2>No disabled themes.</h2>
					<p>Try refreshing if you believe this is an error.</p>
				</div>}
			</ul>

			<SaveConfirmationModal active={isDirty} onSave={handleSave} onReset={() => setEnabledThemes(ctxEnabled || [])} />
		</div>
	);
}
