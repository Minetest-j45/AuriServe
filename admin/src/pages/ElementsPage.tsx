import * as React from 'react';

import './ElementsPage.scss';

import CardHeader from "../CardHeader";

import { AppContext } from "../AppContext";

export default class ElementsPage extends React.PureComponent {
	render() {
		return (
			<AppContext.Consumer>{ctx =>
				<div className="Page ElementsPage">
					<section className="Page-Card">
						<CardHeader icon="/admin/asset/icon/element-dark.svg" title="Manage Elements" 
							subtitle={`Manage dynamic elements on ${ctx.data.sitename}.`} />

						<h2>Recent Elements</h2>

						<h2>All Elements</h2>
						
					</section>
				</div>
			}</AppContext.Consumer>
		);
	}
}

ElementsPage.contextType = AppContext;
