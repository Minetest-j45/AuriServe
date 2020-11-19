import * as Preact from 'preact';
import { useContext, useRef } from 'preact/hooks';
import { usePopupCancel } from '../Hooks';

import { Link } from 'react-router-dom';
import { createPortal } from 'preact/compat';
import { CSSTransition } from 'preact-transitioning';

import './UserCard.sass';

import UserRolesList from './UserRolesList';

import { AppContext } from '../AppContext';

interface Props {
	visible: boolean;
	parent: HTMLElement;
	identifier: string;

	onClose: () => void;
}

export default function UserCard(props: Props) {
	const ctx = useContext(AppContext);
	const ref = useRef<HTMLDivElement>(null);

	usePopupCancel(ref, props.onClose, () => props.visible, [ props.visible ]);

	const body = document.getElementsByTagName('body')[0];

	const user = ctx.data.users?.filter(u => u.identifier === props.identifier)?.[0];
	if (!user) return null;

	return createPortal(
		<div>
			<CSSTransition in={props.visible} duration={150} classNames='Animate'>
				<div class='UserCard'>
					<div class='UserCard-Card' ref={ref} style={{
						top: props.parent.getBoundingClientRect().bottom + 'px',
						left: ((props.parent.getBoundingClientRect().left +
							props.parent.getBoundingClientRect().right) / 2) + 'px'}}>

						<div class='UserCard-Header'>
							<img src='/admin/asset/icon/user-color.svg' />
							<h1 class='UserCard-Name' title={user?.name}>{user?.name}</h1>
							<h2 class='UserCard-Identifier' title={'@' + props.identifier}>@{props.identifier}</h2>
						</div>
						<div class='UserCard-Body'>
							{user && <UserRolesList user={user} wrap={true} edit={true} />}
							<Link to={'/users/' + props.identifier} className='UserCard-Full'>View Profile</Link>
						</div>
					</div>
				</div>
			</CSSTransition>
		</div>,
		body
	);
};
