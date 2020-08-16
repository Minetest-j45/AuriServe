import * as React from 'react';
// import { Link } from 'react-router-dom';

import './MainPage.scss';

import Meter from "../Meter";

import { SiteData } from "../../../common/SiteData";

interface Props {
	data: SiteData;
}

export default class MainPage extends React.PureComponent<Props, {}> {
	constructor(props: any) {
		super(props);
	}

	render() {
		console.log(this.props.data);
		return (
			<div className="MainPage">
				<div className="MainPage-Header">
					<h1>
						<img src="/admin/asset/icon/globe-dark.svg" alt=""/>
						{this.props.data.domain}
					</h1>
					<h2>{this.props.data.sitename}</h2>
				</div>
				<div className="MainPage-Content">
					<aside>
						<div className="MainPage-MediaCard">
							<Meter usage={this.props.data.media.usage} size={this.props.data.media.capacity} />
						</div>
					</aside>
					<main>
					</main>
				</div>
			</div>
		);
	}
}
