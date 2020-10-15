import * as Preact from 'preact';

import './Page.sass';
import './ThemesPage.scss';

import ThemeItem from '../ThemeItem';
import CardHeader from '../CardHeader';
import SelectGroup from '../SelectGroup';

import { Theme } from '../../../../common/interface/DBStructs';
import { AppContext } from '../AppContext';

interface State {
	selected: number[];
}

export default class ThemesPage extends Preact.Component<{}, State> {
	private selected: number[] = [];

	constructor(props: {}) {
		super(props);
		this.state = { selected: [] };
	}

	componentWillMount() {
		this.context.refreshSiteData('themes');
	}

	render() {
		return (
			<AppContext.Consumer>{ctx =>
				<div className="Page ThemesPage">
					<section className="Page-Card">
						<CardHeader icon="/admin/asset/icon/theme-dark.svg" title="Manage Themes"
							subtitle={'Install, enable, or disable site themes.'} />

						<div className="ThemesPage-Toolbar">
							<div>
								<button className="MediaPage-Toolbar-Button" onClick={this.handleToggleThemes}>
									<img src="/admin/asset/icon/add-dark.svg"/><span>Install Theme</span>
								</button>

								{this.state.selected.length > 0 && <button onClick={this.handleToggleThemes}>
									<img src="/admin/asset/icon/refresh-dark.svg"/>
									<span>{'Toggle Theme' + (this.state.selected.length !== 1 ? ' (' + this.state.selected.length + ')' : '')}</span>
								</button>}
							</div>
							<div>
								<button className="MediaPage-Toolbar-Button" onClick={this.handleToggleThemes}>
									<img src="/admin/asset/icon/sort-dark.svg"/><span>Sort by Size</span>
								</button>

								<button onClick={this.handleRefreshThemes}>
									<img src="/admin/asset/icon/refresh-dark.svg"/><span>Refresh</span>
								</button>
							</div>
						</div>

						<SelectGroup className="ThemesPage-Themes" onSelectionChange={this.handleSelectionChange} multi={true}>
							{ctx.data.themes.map((t: Theme, i: number) => <ThemeItem item={t} ind={i} onClick={this.handleToggleThemes}
								active={ctx.data.enabledThemes.indexOf(t.identifier) !== -1} key={t.identifier}/>)}
						</SelectGroup>

						{ctx.data.themes.length === 0 && <h2 className="ThemesPage-NoThemes">No themes found.</h2>}
					</section>
				</div>
			}</AppContext.Consumer>
		);
	}

	private handleSelectionChange = (selected: number[]): void => {
		this.selected = selected;
		this.setState({ selected: selected });
	}

	private handleToggleThemes = (): void => {
		fetch('/admin/themes/toggle', {
			method: 'POST',
			cache: 'no-cache',
    	headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(this.selected.map(ind => this.context.data.themes[ind].identifier))
		}).then(r => r.json()).then(this.context.handleSiteData);
	}

	private handleRefreshThemes = (): void => {
		fetch('/admin/themes/refresh', {
			cache: 'no-cache',
			method: 'POST'
		}).then(r => r.json()).then(this.context.handleSiteData);
	}
}

ThemesPage.contextType = AppContext;
