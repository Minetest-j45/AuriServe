import * as React from 'react';

import './PluginItem.scss';

import Selectable from "./Selectable";
import { ClickHandlerCallbacks } from "./ClickHandler";

import { Plugin } from "../../common/DBStructs";

interface Props {
	item: Plugin;
	ind: number;
	active: boolean;

	onClick: (_: React.SyntheticEvent) => void;
}

export default class MediaItem extends React.Component<Props> {
	callbacks: ClickHandlerCallbacks;

	constructor(props: Props) {
		super(props);

		this.callbacks = {
			onDoubleClick: this.props.onClick
		};
	}

	render() {
		return (
			<Selectable className="PluginItem" ind={this.props.ind} callbacks={this.callbacks} doubleClickSelects={true}>
				<div className="PluginItem-Cover">
					{this.props.item.hasCover && <img src={"/admin/plugins/cover/" + this.props.item.identifier + ".jpg"}/>}
					<span className={"PluginItem-Tag " + (this.props.active ? "Enabled" : "Disabled")}>{this.props.active ? "Enabled" : "Disabled"}</span>
				</div>

				<div className="PluginItem-Content">
					<h2 className="PluginItem-Title">{this.props.item.name}</h2>
					<p className="PluginItem-Author">{this.props.item.author}</p>
					{this.props.item.description && <p className="PluginItem-Description">{this.props.item.description}</p>}
				</div>
			</Selectable>
		);
	}
}
