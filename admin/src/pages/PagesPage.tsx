import * as React from 'react';

import './Page.scss';
import './PagesPage.scss';

import CardHeader from "../CardHeader";

import { AppContext } from "../AppContext";

export default class PagesPage extends React.PureComponent<{}, {}> {
	render() {
		return (
			<AppContext.Consumer>{_ =>
				<div className="Page PagesPage">
					<section className="Page-Card">
						<CardHeader icon="/admin/asset/icon/element-dark.svg" title="Manage Pages" 
							subtitle={`Manage site pages and elements.`} />
					</section>
				</div>
			}</AppContext.Consumer>
		);
	}
}

PagesPage.contextType = AppContext;
