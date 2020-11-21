import * as Preact from 'preact';
import { useMemo } from 'preact/hooks';
import { useSiteData } from '../../Hooks';

import './UserPage.sass';

import UserRolesList from '../UserRolesList';

export default function UserPage() {
	const [ data ] = useSiteData('users');
	const identifier = useMemo(() => window.location.pathname.replace(/^\/admin\/users\//g, ''), []);
	const user = (data.users || []).filter(u => u.identifier === identifier)[0];

	return (
		<div class='Page UserPage'>
			<section class='Page-Card UserPage-Card'>
				<div class='UserPage-Header'>
					{user && <Preact.Fragment>
						<img class='UserPage-Icon' src='/admin/asset/icon/user-color.svg' alt=''/>
						<div class='UserPage-Details'>
							<h1 class='UserPage-Name'>{user.name}</h1>
							<h2 class='UserPage-Identifier'>@{user.identifier}</h2>
							<UserRolesList user={user} wrap={true} edit={true} />
						</div>
					</Preact.Fragment>}
				</div>
			</section>
		</div>
	);
}
