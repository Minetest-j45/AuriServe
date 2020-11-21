import * as Preact from 'preact';
import { useState } from 'preact/hooks';
import { useSiteData } from '../../Hooks';

import './PluginsPage.scss';

import PluginItem from '../PluginItem';
import CardHeader from '../CardHeader';
import SelectGroup from '../SelectGroup';

import { Plugin } from '../../../../common/interface/DBStructs';

export default function PluginsPage() {
	const [ { plugins, enabledPlugins }, refreshData, updateData ] = useSiteData('plugins');

	const [ selected, setSelected ] = useState<number[]>([]);

	const handleTogglePlugins = async () => {
		const r = await fetch('/admin/plugins/toggle', {
			method: 'POST', cache: 'no-cache',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(selected.map(ind => (plugins || [])[ind]?.identifier))
		});
		const res = await r.json();
		updateData(res as any);
	};

	return (
		<div className='Page PluginsPage'>
			<section className='Page-Card'>
				<CardHeader icon='/admin/asset/icon/element-dark.svg' title='Manage Plugins'
					subtitle={'Install, enable, or disable plugins.'} />

				<div className='PluginsPage-Toolbar'>
					<div>

						{/* <button className='MediaPage-Toolbar-Button' onClick={this.handleTogglePlugins}>
							<img src='/admin/asset/icon/add-dark.svg' alt=''/><span>Install Plugin</span>
						</button>*/}

						{selected.length > 0 && <button onClick={handleTogglePlugins}>
							<img src='/admin/asset/icon/refresh-dark.svg' alt=''/>
							<span>{'Toggle Plugin' + (selected.length !== 1 ? ' (' + selected.length + ')' : '')}</span>
						</button>}
					</div>
					<div>

						{/* <button className='MediaPage-Toolbar-Button' onClick={this.handleTogglePlugins}>
							<img src='/admin/asset/icon/sort-dark.svg' alt=''/><span>Sort by Size</span>
						</button>*/}

						<button onClick={() => refreshData(['plugins', 'info'])} title='Refresh' aria-label='Refresh'>
							<img src='/admin/asset/icon/refresh-dark.svg' alt=''/><span>Refresh</span>
						</button>
					</div>
				</div>

				{plugins && enabledPlugins &&
					<SelectGroup className='PluginsPage-Plugins' onSelectionChange={setSelected} multi={true}>
						{plugins.map((t: Plugin, i: number) => <PluginItem item={t} ind={i} onClick={handleTogglePlugins}
							active={enabledPlugins!.indexOf(t.identifier) !== -1} key={t.identifier}/>)}
					</SelectGroup>
				}

				{!plugins && <h2 className='PluginsPage-Notice'>Loading plugins...</h2>}
				{plugins && plugins.length === 0 && <h2 className='PluginsPage-Notice'>No plugins found.</h2>}
			</section>
		</div>
	);
}
