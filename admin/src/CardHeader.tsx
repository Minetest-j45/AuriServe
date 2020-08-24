import * as React from "react";

import './CardHeader.scss';

interface Props {
	icon: string;
	title: string;
	subtitle?: string;
}
export default class CardHeader extends React.PureComponent<Props, {}> {
	render() {
		return (		
			<div className="CardHeader">
				<img className="CardHeader-Icon" src={this.props.icon} />	
				<h1 className="CardHeader-Title">{this.props.title}</h1>
				<p className="CardHeader-Description">{this.props.subtitle || ""}</p>
			</div>
		);
	}
}
