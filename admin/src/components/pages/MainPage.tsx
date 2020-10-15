import * as Preact from 'preact';

import './Page.sass';
import './MainPage.scss';

import Meter from '../Meter';

import { AppContext } from '../../AppContext';

export default class MainPage extends Preact.Component {
	componentWillMount() {
		this.context.refreshSiteData('info');
	}

	render() {
		return (
			<div className="MainPage">
				<div className="MainPage-Header">
					<h1>
						<img src="/admin/asset/icon/globe-dark.svg" alt=""/>
						{this.context.data.domain}
					</h1>
					<h2>{this.context.data.sitename}</h2>
				</div>
				<div className="MainPage-Content">
					<aside>
						<div className="MainPage-MediaCard">

							<AppContext.Consumer>{ctx =>
								<Meter usage={ctx.data.mediaUsed} size={ctx.data.mediaMax} />
							}</AppContext.Consumer>

						</div>
					</aside>
					<main>
					</main>
				</div>
			</div>
		);
	}
}

MainPage.contextType = AppContext;
