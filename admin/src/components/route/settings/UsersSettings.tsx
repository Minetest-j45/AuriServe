import * as Preact from 'preact';
import { useSiteData } from '../../../Hooks';

import UserItem from '../../UserItem';
import Label from '../../input/InputLabel';

export default function RolesSettings() {
	const [ { users } ] = useSiteData([ 'users' ]);

	return (
		<div class='Settings UsersSettings'>
			<Label label='Users' />
			{users && users.map(user => <UserItem key={user.identifier} user={user} />)}
		</div>
	);
}
