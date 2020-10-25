import * as Preact from 'preact';

import './Page.sass';
import './UserPage.sass';

import UserRolesList from '../UserRolesList';

import { AppContext } from '../../AppContext';

// import { SiteData } from '../../../../common/interface/SiteData';
import { User } from '../../../../common/interface/DBStructs';

interface State {
	user: string;
}

export default class UserPage extends Preact.Component<{}, State> {
	constructor(p: any) {
		super(p);
	}

	componentDidMount() {
		this.context.refreshSiteData('users');
		this.setState({ user: window.location.pathname.replace(/^\/admin\/users\//g, '') });
	}

	render() {
		let user: Omit<User, 'pass'> | undefined;

		return (
			<div class='Page UserPage'>
				<section class='Page-Card UserPage-Card'>
					<AppContext.Consumer>{ctx =>
						<div class='UserPage-Header'>
							{(user = ctx.data.users?.filter(u => u.identifier === this.state.user)[0]) && <Preact.Fragment>
								<img class='UserPage-Icon' src='/admin/asset/icon/user-color.svg' alt=''/>
								<div class='UserPage-Details'>
									<h1 class='UserPage-Name'>{user.name}</h1>
									<h2 class='UserPage-Identifier'>@{user.identifier}</h2>
									<UserRolesList user={user} wrap={true} edit={true} />
								</div>
							</Preact.Fragment>}
						</div>
					}</AppContext.Consumer>
				</section>
			</div>
		);
	}
}

UserPage.contextType = AppContext;
