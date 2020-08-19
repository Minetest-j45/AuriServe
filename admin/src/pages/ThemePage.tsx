import * as React from 'react';

import './ThemePage.scss';

import ThemeItem from "../ThemeItem";
import CardHeader from "../CardHeader";
import SelectGroup from "../SelectGroup";

import { Theme } from "../../../common/DBStructs";
import { AppContext } from "../AppContext";

interface State {
	selected: number[];
}

export default class ThemePage extends React.PureComponent<{}, State> {
	constructor(props: {}) {
		super(props);
		this.state = { selected: [] };

		this.handleToggleThemes = this.handleToggleThemes.bind(this);
		this.handleRefreshThemes = this.handleRefreshThemes.bind(this);
		this.handleSelectionChange = this.handleSelectionChange.bind(this);
	}

	private handleSelectionChange(selected: number[]): void {
		this.setState({ selected: selected });
	}

	private handleToggleThemes(): void {
		fetch("/admin/theme/toggle", {
			method: 'POST',
			cache: 'no-cache',
    	headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(this.state.selected.map(ind => this.context.data.themes[ind].identifier)),
		}).then(r => r.json()).then(res => {
			this.context.handleSiteData(res);
		});
	}

	private handleRefreshThemes(): void {
		fetch("/admin/theme/refresh", {
			cache: 'no-cache',
			method: 'POST',
		}).then(r => r.json()).then(res => {
			this.context.handleSiteData(res);
		});
	}

	render() {
		return (
			<AppContext.Consumer>{ctx =>
				<div className="Page ThemePage">
					<section className="Page-Card">
						<CardHeader icon="/admin/asset/icon/theme-dark.svg" title="Manage Themes" 
							subtitle={`Select your theme for use with ${ctx.data.sitename}.`} />

							<div className="ThemePage-Toolbar">
								<div>
									{/*<div className="MediaPage-Toolbar-Separator"/>*/}

									{this.state.selected.length > 0 && <button onClick={this.handleToggleThemes}>
										<img src="/admin/asset/icon/add-dark.svg"/>
										<span>{this.state.selected.length == 1 ? 
											(ctx.data.activeThemes.indexOf(ctx.data.themes![this.state.selected[0]].identifier) != -1 ? "Disable Theme" : "Enable Theme") : 
											"Toggle " + this.state.selected.length + " Themes"}</span>
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

							<SelectGroup className="ThemePage-Themes" onSelectionChange={this.handleSelectionChange} multi={true}>
								{ctx.data.themes!.map((t: Theme, i: number) => <ThemeItem item={t} ind={i} 
									active={ctx.data.activeThemes.indexOf(t.identifier) != -1} key={t.identifier}/>)}
							</SelectGroup>
					</section>
				</div>
			}</AppContext.Consumer>
		);
	}
}

ThemePage.contextType = AppContext;
