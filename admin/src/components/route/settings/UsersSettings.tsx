import * as Preact from 'preact';
import { useSiteData } from '../../../Hooks';

import UserItem from '../../UserItem';

export default function RolesSettings() {
	const [ { users } ] = useSiteData([ 'users' ]);

	return (
		<div class='Settings UsersSettings'>
			{users && users.map(user => <UserItem key={user.identifier} user={user} />)}
		</div>
	);
}
