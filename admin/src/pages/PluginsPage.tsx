import * as React from 'react';

import './PluginsPage.scss';

import PluginItem from "../PluginItem";
import CardHeader from "../CardHeader";
import SelectGroup from "../SelectGroup";

import { AppContext } from "../AppContext";
import { Plugin } from "../../../common/interface/DBStructs";

interface State {
	selected: number[];
}

export default class PluginsPage extends React.PureComponent<{}, State> {
	private selected: number[] = [];

	constructor(props: {}) {
		super(props);
		this.state = { selected: [] };

		this.handleTogglePlugins = this.handleTogglePlugins.bind(this);
		this.handleRefreshPlugins = this.handleRefreshPlugins.bind(this);
		this.handleSelectionChange = this.handleSelectionChange.bind(this);
	}

	private handleSelectionChange(selected: number[]): void {
		this.selected = selected;
		this.setState({ selected: selected });
	}

	private handleTogglePlugins(): void {
		fetch("/admin/plugins/toggle", {
			method: 'POST',
			cache: 'no-cache',
    	headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(this.selected.map(ind => this.context.data.plugins[ind].identifier)),
		}).then(r => r.json()).then(res => {
			this.context.handleSiteData(res);
		});
	}

	private handleRefreshPlugins(): void {
		fetch("/admin/plugins/refresh", {
			cache: 'no-cache',
			method: 'POST',
		}).then(r => r.json()).then(res => {
			this.context.handleSiteData(res);
		});
	}

	render() {
		return (
			<AppContext.Consumer>{ctx =>
				<div className="Page PluginsPage">
					<section className="Page-Card">
						<CardHeader icon="/admin/asset/icon/element-dark.svg" title="Manage Plugins" 
							subtitle={`Install, enable, or disable plugins.`} />

							<div className="PluginsPage-Toolbar">
								<div>
									<button className="MediaPage-Toolbar-Button" onClick={this.handleTogglePlugins}>
										<img src="/admin/asset/icon/add-dark.svg"/><span>Install Plugin</span>
									</button>

									{this.state.selected.length > 0 && <button onClick={this.handleTogglePlugins}>
										<img src="/admin/asset/icon/refresh-dark.svg"/>
										<span>{"Toggle Plugin" + (this.state.selected.length != 1 ? " (" + this.state.selected.length + ")" : "")}</span>
									</button>}
								</div>
								<div>
									<button className="MediaPage-Toolbar-Button" onClick={this.handleTogglePlugins}>
										<img src="/admin/asset/icon/sort-dark.svg"/><span>Sort by Size</span>
									</button>

									<button onClick={this.handleRefreshPlugins}>
										<img src="/admin/asset/icon/refresh-dark.svg"/><span>Refresh</span>
									</button>
								</div>
							</div>

							<SelectGroup className="PluginsPage-Plugins" onSelectionChange={this.handleSelectionChange} multi={true}>
								{ctx.data.plugins.map((t: Plugin, i: number) => <PluginItem item={t} ind={i} onClick={this.handleTogglePlugins}
									active={ctx.data.enabledPlugins.indexOf(t.identifier) != -1} key={t.identifier}/>)}
							</SelectGroup>
					</section>
				</div>
			}</AppContext.Consumer>
		);
	}
}

PluginsPage.contextType = AppContext;
