import * as Preact from 'preact';
import { useReducer, useEffect } from 'preact/hooks';
import { useSiteData } from '../../../Hooks';

import './MainSettings.sass';

import * as Input from '../../input/Input';
import SaveConfirmationModal from '../../SaveConfirmationModal';

export default function MainSettings() {
	const [ data,, mergeData ] = useSiteData([ 'info' ]);
	const [ info, setInfo ] = useReducer((info, newInfo: any) => ({...info, ...newInfo}),
		{ sitename: '', domain: '', description: '' });

	const handleReset = () => setInfo({ sitename: data.sitename ?? '', domain: data.domain ?? '', description: '' });
	useEffect(() => handleReset(), [ data ]);

	const isDirty = info.sitename !== data.sitename || info.domain !== data.domain || info.description !== '';

	const handleSave = () => {
		fetch('/admin/settings/info/update', {
			method: 'POST',
			cache: 'no-cache',
    	headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(info)
		}).then(r => r.json()).then(mergeData);
	};

	return (
		<div class='Settings MainSettings'>
			<div class='MainSettings-Columns' style={{paddingBottom: 16}}>
				<div>
					<Input.Annotation title='Site Name'
						description='The name of the website, used in the tab title, metadata, and search results.'>
						<Input.Text placeholder={'An AuriServe Website'} value={info.sitename} setValue={sitename => setInfo({ sitename })}/>
					</Input.Annotation>
				</div>
				<div>
					<Input.Annotation title='Site Domain'
						description='The domain name of the website. Used by plugins for external links.'>
						<Input.Text placeholder={'https://example.com'} value={info.domain} setValue={domain => setInfo({ domain })}/>
					</Input.Annotation>
				</div>
			</div>

			<Input.Annotation title='Default Site-Description'
				description='The default meta-description given to pages if they do not have one specified.'>
				<Input.Text long={true} placeholder='Description' value={info.description} setValue={description => setInfo({ description })}/>
			</Input.Annotation>

			<SaveConfirmationModal active={isDirty} onSave={handleSave} onReset={handleReset} />
		</div>
	);
}
