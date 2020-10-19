import Cookie from 'js-cookie';
import * as Preact from 'preact';
import { NavLink as Link } from 'react-router-dom';

import './AppHeader.scss';

export default class AppHeader extends Preact.Component {
	constructor(props: any) {
		super(props);

		this.logout = this.logout.bind(this);
	}

	render() {
		return (
			<header class="AppHeader">
				<div class="AppHeader-wrap">
					<img class="AppHeader-logo" src="/admin/asset/icon/serve.svg" title='AuriServe' alt='AuriServe' />

					<nav class="AppHeader-nav">
						<Link activeClassName="active" to="/home">Home</Link>
						<Link activeClassName="active" to="/pages">Pages</Link>
						<Link activeClassName="active" to="/media">Media</Link>
						<Link activeClassName="active" to="/themes">Themes</Link>
						<Link activeClassName="active" to="/plugins">Plugins</Link>
						<Link activeClassName="active" to="/users">Users</Link>
					</nav>

					{/* <Link className="AppHeader-options" to="/user_options"><img src="/admin/asset/icon/settings-dark.svg"/></Link>*/}

					<button class="AppHeader-logout" onClick={this.logout} title='Log out'>
						<img src="/admin/asset/icon/logout-dark.svg" alt='' />
					</button>
				</div>
			</header>
		);
	}

	private logout(): void {
		Cookie.remove('tkn');
		location.href = '/admin';
	}
}
