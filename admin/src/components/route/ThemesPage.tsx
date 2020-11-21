import * as Preact from 'preact';
import { useState } from 'preact/hooks';
import { useSiteData } from '../../Hooks';

import './ThemesPage.scss';

import ThemeItem from '../ThemeItem';
import CardHeader from '../CardHeader';
import SelectGroup from '../SelectGroup';

import { Theme } from '../../../../common/interface/DBStructs';

export default function ThemesPage() {
	const [ { themes, enabledThemes }, refreshData, updateData ] = useSiteData('themes');

	const [ selected, setSelected ] = useState<number[]>([]);

	const handleToggleThemes = async () => {
		const r = await fetch('/admin/themes/toggle', {
			method: 'POST', cache: 'no-cache',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(selected.map(ind => (themes || [])[ind]?.identifier))
		});
		const res = await r.json();
		updateData(res as any);
	};

	return (
		<div className='Page ThemesPage'>
			<section className='Page-Card'>
				<CardHeader icon='/admin/asset/icon/theme-dark.svg' title='Manage Themes'
					subtitle={'Install, enable, or disable site themes.'} />

				<div className='ThemesPage-Toolbar'>
					<div>
						{/* <button className='MediaPage-Toolbar-Button' onClick={this.handleToggleThemes}>
							<img src='/admin/asset/icon/add-dark.svg'/><span>Install Theme</span>
						</button>*/}

						{selected.length > 0 && <button onClick={handleToggleThemes}>
							<img src='/admin/asset/icon/refresh-dark.svg' alt=''/>
							<span>{'Toggle Theme' + (selected.length !== 1 ? ' (' + selected.length + ')' : '')}</span>
						</button>}
					</div>
					<div>
						{/* <button className='MediaPage-Toolbar-Button' onClick={this.handleToggleThemes}>
							<img src='/admin/asset/icon/sort-dark.svg'/><span>Sort by Size</span>
						</button>*/}

						<button onClick={() => refreshData(['themes', 'info'])}>
							<img src='/admin/asset/icon/refresh-dark.svg' alt=''/><span>Refresh</span>
						</button>
					</div>
				</div>

				{themes && enabledThemes &&
					<SelectGroup className='ThemesPage-Themes' onSelectionChange={setSelected} multi={true}>
						{themes.map((t: Theme, i: number) => <ThemeItem item={t} ind={i} onClick={handleToggleThemes}
							active={enabledThemes!.indexOf(t.identifier) !== -1} key={t.identifier}/>)}
					</SelectGroup>
				}

				{!themes && <h2 className='ThemesPage-Notice'>Loading themes...</h2>}
				{themes && themes.length === 0 && <h2 className='ThemesPage-Notice'>No themes found.</h2>}
			</section>
		</div>
	);
}
