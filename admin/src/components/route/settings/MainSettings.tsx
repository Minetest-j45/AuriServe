import * as Preact from 'preact';
import { useReducer, useEffect } from 'preact/hooks';
import { useSiteData } from '../../../Hooks';

import './MainSettings.sass';

import * as Input from '../../input/Input';
import SaveConfirmationModal from '../../SaveConfirmationModal';

export default function MainSettings() {
	const [ data,, mergeData ] = useSiteData([ 'info' ]);
	const [ info, setInfo ] = useReducer((info, newInfo: any) => ({...info, ...newInfo}),
		{ sitename: data.sitename, domain: data.domain, description: data.description });

	const handleReset = () => setInfo({ sitename: data.sitename ?? '',
		domain: data.domain ?? '', description: data.description ?? '' });
	
	useEffect(() => handleReset(), [ data ]);

	const isDirty = info.sitename !== data.sitename || info.domain !== data.domain || info.description !== data.description;

	const handleSave = () => {
		fetch('/admin/info/update', {
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
						description='A name for your site, used by browers and search engines.'>
						<Input.Text placeholder={'An AuriServe Website'} value={info.sitename} setValue={sitename => setInfo({ sitename })}/>
					</Input.Annotation>
				</div>
				<div>
					<Input.Annotation title='Site Domain'
						description='The domain of your site. Used by plugins and links.'>
						<Input.Text placeholder={'https://example.com'} value={info.domain} setValue={domain => setInfo({ domain })}/>
					</Input.Annotation>
				</div>
			</div>

			<Input.Annotation title='Site Description'
				description='A short, consise description of your website, used in search engine results.'>
				<Input.Text long={true} placeholder='Description' value={info.description} setValue={description => setInfo({ description })}/>
			</Input.Annotation>

			<SaveConfirmationModal active={isDirty} onSave={handleSave} onReset={handleReset} />
		</div>
	);
}
