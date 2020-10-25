import * as Preact from 'preact';
import { NavLink as Link } from 'react-router-dom';

import './UserItem.sass';

import UserRolesList from './UserRolesList';

import { User } from '../../../common/interface/DBStructs';

interface Props {
	user: Omit<User, 'pass'>;
}

export default class UserItem extends Preact.Component<Props, {}> {
	render(props: Props) {
		return (
			<Link to={'/users/' + props.user.identifier} className='UserItem'>
				<img class='UserItem-Icon' src='/admin/asset/icon/user-color.svg' alt=''/>
				<h2 class='UserItem-Name'>{props.user.name}</h2>
				<p class='UserItem-Identifier'>{props.user.identifier}</p>
				<UserRolesList user={props.user} />
				<img class='UserItem-More' src='/admin/asset/icon/menu-dark.svg' alt=''/>
			</Link>
		);
	}
}
