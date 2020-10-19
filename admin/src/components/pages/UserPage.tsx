import * as Preact from 'preact';

import './Page.sass';
import './UserPage.sass';

import { AppContext } from '../../AppContext';

import { User } from '../../../../common/interface/DBStructs';
import { SiteData } from '../../../../common/interface/SiteData';

interface State {
	user?: Omit<User, 'pass'>;
}

export default class UserPage extends Preact.Component<{}, State> {
	constructor(p: any) {
		super(p);
	}

	componentDidMount() {
		this.context.refreshSiteData('users').then((data: SiteData) => {
			let user: string = window.location.pathname.replace(/^\/admin\/users\//g, '');
			this.setState({ user: data.users.filter(u => u.identifier === user)[0] });
		});
	}

	render() {
		return (
			<div class='Page UserPage'>
				<section class='Page-Card UserPage-Card'>
					{this.state.user && <Preact.Fragment>
						<img class='UserPage-Icon' src='/admin/asset/icon/user-color.svg' alt=''/>
						<div class='UserPage-Details'>
							<h1 class='UserPage-Name'>{this.state.user.name}</h1>
							<h2 class='UserPage-Identifier'><span class='UserPage-At'>@</span>{this.state.user.identifier}</h2>
							<ul class='UserPage-Roles'>{this.state.user.roles.map(r => <li class='UserPage-Role'>{r}</li>)}</ul>
						</div>
					</Preact.Fragment>}
				</section>
			</div>
		);
	}
}

UserPage.contextType = AppContext;
