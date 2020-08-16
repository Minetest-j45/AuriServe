import Cookie from 'js-cookie';
import * as React from 'react';
import { NavLink } from 'react-router-dom';

import './AppHeader.scss';

export default class AppHeader extends React.PureComponent {
	constructor(props: any) {
		super(props);

		this.logout = this.logout.bind(this);
	}

	private logout(_: React.SyntheticEvent): void {
		Cookie.remove('tkn');
		location.href = '/admin';
	}

	render() {
		return (
			<header className="AppHeader">
				<div className="AppHeader-wrap">
					<img className="AppHeader-logo" src="/admin/asset/icon/serve.svg" />

					<nav className="AppHeader-nav">
						<NavLink activeClassName="active" exact to="/">Home</NavLink>
						<NavLink activeClassName="active" exact to="/media">Media</NavLink>
						<NavLink activeClassName="active" exact to="/pages">Pages</NavLink>
					</nav>
					
					<NavLink className="AppHeader-options" to="/user_options"><img src="/admin/asset/icon/settings-dark.svg"/></NavLink>
					<button className="AppHeader-logout" onClick={this.logout}><img src="/admin/asset/icon/logout-dark.svg" /></button>
				</div>
			</header>
		);
	}
}
