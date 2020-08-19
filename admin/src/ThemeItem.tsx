import * as React from 'react';

import './ThemeItem.scss';

import Selectable from "./Selectable";
// import { ClickHandlerCallbacks } from "./ClickHandler";

import { Theme } from "../../common/DBStructs";
// import * as Format from "../../common/util/Format";

interface Props {
	item: Theme;
	ind: number;
	active: boolean;

	// onClick: (e: React.SyntheticEvent) => void;
}

export default class MediaItem extends React.Component<Props> {
	render() {
		return (
			<Selectable className="ThemeItem" ind={this.props.ind} doubleClickSelects={true}>
				<div className="ThemeItem-Cover">
					{this.props.item.hasCover && <img src={"/admin/theme/cover/" + this.props.item.identifier + ".jpg"}/>}
					<span className={"ThemeItem-Tag " + (this.props.active ? "Enabled" : "Disabled")}>{this.props.active ? "Enabled" : "Disabled"}</span>
				</div>

				<div className="ThemeItem-Content">
					<h2 className="ThemeItem-Title">{this.props.item.name}</h2>
					<p className="ThemeItem-Author">{this.props.item.author}</p>
					{this.props.item.description && <p className="ThemeItem-Description">{this.props.item.description}</p>}
				</div>
			</Selectable>
		);
	}
}
