import Cookie from 'js-cookie';
import * as Preact from 'preact';
import { Link } from 'preact-router';

import './AppHeader.scss';

export default class AppHeader extends Preact.Component {
	constructor(props: any) {
		super(props);

		this.logout = this.logout.bind(this);
	}

	private logout(): void {
		Cookie.remove('tkn');
		location.href = '/admin';
	}

	render() {
		return (
			<header class="AppHeader">
				<div class="AppHeader-wrap">
					<img class="AppHeader-logo" src="/admin/asset/icon/serve.svg" />

					<nav class="AppHeader-nav">
						<Link activeClassName="active" href="/admin/home">Home</Link>
						<Link activeClassName="active" href="/admin/pages">Pages</Link>
						<Link activeClassName="active" href="/admin/media">Media</Link>
						<Link activeClassName="active" href="/admin/themes">Themes</Link>
						<Link activeClassName="active" href="/admin/plugins">Plugins</Link>
					</nav>
					
					<Link class="AppHeader-options" href="/admin/user_options"><img src="/admin/asset/icon/settings-dark.svg"/></Link>
					<button class="AppHeader-logout" onClick={this.logout}><img src="/admin/asset/icon/logout-dark.svg" /></button>
				</div>
			</header>
		);
	}
}
