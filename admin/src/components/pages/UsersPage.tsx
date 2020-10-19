import * as Preact from 'preact';

import './Page.sass';
import './UsersPage.sass';

import CardHeader from '../CardHeader';
import { AppContext } from '../../AppContext';

import UserItem from '../UserItem';

export default class UsersPage extends Preact.Component {
	constructor(p: any) {
		super(p);
	}

	componentDidMount() {
		this.context.refreshSiteData('users');
	}

	render() {
		return (
			<div class='Page UsersPage'>
				<section class='Page-Card'>
					<CardHeader icon='/admin/asset/icon/users-dark.svg' title='Manage Accounts'
						subtitle='Manage access to AuriServe.' />

					<AppContext.Consumer>{ctx =>
						<div class='UsersPage-Users'>
							{ctx.data.users.map(user => <UserItem key={user.identifier} user={user} />)}
						</div>
					}</AppContext.Consumer>
				</section>

				<section class='Page-Card'>
					<CardHeader icon='/admin/asset/icon/element-dark.svg' title='Manage Roles'
						subtitle='Manage access to AuriServe.' />
				</section>
			</div>
		);
	}
}

UsersPage.contextType = AppContext;
