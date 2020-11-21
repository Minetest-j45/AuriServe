import * as Preact from 'preact';
import { useSiteData } from '../../Hooks';

import './UsersPage.sass';

import CardHeader from '../CardHeader';
import RolesEditor from '../roles/RolesEditor';

import UserItem from '../UserItem';

export default function UsersPage() {
	const [ { users, roles } ] = useSiteData([ 'users', 'roles' ]);

	return (
		<div class='Page UsersPage'>
			<section class='Page-Card'>
				<CardHeader icon='/admin/asset/icon/users-dark.svg' title='Manage Accounts'
					subtitle='Manage access to AuriServe.' />

				<div class='UsersPage-Users'>
					{users && users.map(user => <UserItem key={user.identifier} user={user} />)}
				</div>
			</section>

			<section class='Page-Card'>
				<CardHeader icon='/admin/asset/icon/role-dark.svg' title='Manage Roles'
					subtitle='Manage access to AuriServe.' />
				{roles && <RolesEditor roles={roles} />}
			</section>
		</div>
	);
}
