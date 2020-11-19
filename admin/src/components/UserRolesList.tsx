import * as Preact from 'preact';
import { useState, useRef, useCallback } from 'preact/hooks';
import { usePopupCancel, useSiteData } from '../Hooks';

import './UserRolesList.sass';

import { User, Role } from '../../../common/interface/DBStructs';

interface Props {
	user: Omit<User, 'pass'>;
	wrap?: boolean;
	edit?: boolean;
}

export default function UserRolesList(props: Props) {
	const ref = useRef<HTMLDivElement>(null);
	const [ { roles },, setData ] = useSiteData();
	const [ editing, setEditing ] = useState<boolean>(false);

	usePopupCancel(ref, () => setEditing(false), () => editing, [ editing ]);

	const handleRemoveRole = useCallback((role: string) => {
		fetch('/admin/users/role/remove', {
			method: 'POST', cache: 'no-cache',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({ user: props.user.identifier, role: role })
		}).then(r => r.json()).then(setData);
	}, [ props.user, setData ]);

	const handleAddRole = useCallback((role: string) => {
		fetch('/admin/users/role/add', {
			method: 'POST', cache: 'no-cache',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({ user: props.user.identifier, role: role })
		}).then(r => r.json()).then(setData);
		
		setEditing(false);
	}, [ props.user, setData, setEditing ]);

	const renderRole = (identifier: string, role?: Role) => {
		let style: any = role?.color ? { ['--color']: role.color, ['--bg-color']: role.color + '66' } : {};

		return (
			<li class='UserRolesList-Item' style={style}>
				<button class={'UserRolesList-ItemButton' + (props.edit ? ' Active' : '')}
					onClick={props.edit ? () => handleRemoveRole(identifier) : undefined}>
					<img src='/admin/asset/icon/remove-light.svg' alt='Remove' />
				</button>
				<span>{identifier}</span>
			</li>
		);
	};

	const renderAddRoleForm = () => {
		return (
			<div class='UserRolesList-AddRoleForm' ref={ref} onClick={e => e.stopPropagation()}>
				<p class='UserRolesList-AddRoleFormHeader'>Add Role</p>
				<ul>
					{(roles || []).filter(role => !props.user.roles?.includes(role.identifier)).map(role => <li>
						<button style={role.color && {['--color']: role.color} as any} onClick={() => handleAddRole(role.identifier)}>
							{role.identifier}
						</button>
					</li>)}
				</ul>
			</div>
		);
	};

	return (
		<ul class={'UserRolesList' + (props.wrap ? ' Wrap' : '')}>
			{props.user.roles?.map(r => renderRole(r, roles?.filter(role => role.identifier === r)[0]))}
			{props.edit && <button class='UserRolesList-Item UserRolesList-Add' onClick={() => setEditing(!editing)}>
				<img src='/admin/asset/icon/add-dark.svg' alt='Add'/>
				{editing && renderAddRoleForm()}
			</button>}
		</ul>
	);
};
