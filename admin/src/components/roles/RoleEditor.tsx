import * as Preact from 'preact';

import './RoleEditor.sass';

import * as Input from '../input/Input';

import { Role, RoleAbility } from '../../../../common/interface/DBStructs';

interface Props {
	role: Role;
	setRole: (role: Role) => void;
}

export default function RoleEditor(props: Props) {
	const handleSetColor = (color?: string) => {
		let role = Object.assign(JSON.parse(JSON.stringify(props.role)), { color: color });
		props.setRole(role);
	};

	const handleIdentifierChange = (value: string) => {
		props.setRole({ ...JSON.parse(JSON.stringify(props.role)), ...{ identifier: value }});
	};

	const handleToggleAbility = (ability: RoleAbility) => {
		const abilityStr = RoleAbility[ability];

		let role = Object.assign(JSON.parse(JSON.stringify(props.role)));
		if (role.abilities.filter((f: string) => f === abilityStr).length)
			role.abilities = role.abilities.filter((f: string) => f !== abilityStr);
		else role.abilities.push(abilityStr);

		props.setRole(role);
	};

	const renderAbilitySwitch = (ability: RoleAbility, title: string, description?: string, sep?: boolean) => {
		return (
			<Preact.Fragment>
				<Input.Annotation title={title} description={description}>
					<Input.Checkbox setValue={() => handleToggleAbility(ability)}
						value={props.role.abilities.filter(f => f === RoleAbility[ability]).length > 0} />
				</Input.Annotation>
				{sep !== false && <hr class='RoleEditor-Separator' />}
			</Preact.Fragment>
		);
	};

	return (
		<div class='RoleEditor'>
			<Input.Label label='Role Name'>
				<Input.Text style={props.role.color && {color: props.role.color}}
					value={props.role.identifier} setValue={handleIdentifierChange} />
			</Input.Label>

			<Input.Label label='Role Color' />
			<div class='RoleEditor-ColorSelector'>
				<button class='RoleEditor-ColorTransparent' onClick={() => handleSetColor()}>
					{!props.role.color && <img src='/admin/asset/icon/dash-light.svg' alt='Selected'/>}
				</button>

				<button class='RoleEditor-ColorCustom' onClick={() => handleSetColor()}>
					{!props.role.color && <img src='/admin/asset/icon/dash-light.svg' alt='Selected'/>}
				</button>

				{['#E12D39', '#F0B429', '#6CD410', '#17B897', '#0FB5BA', '#2BB0ED', '#0967D2', '#2251CC', '#8719E0', '#E019D0', '#DA127D',
					'#C52707', '#CB6E17', '#399709', '#048271', '#099AA4', '#127FBF', '#03449E', '#132DAD', '#690CB0', '#B30BA3', '#A30664']
					.map(c =>
						<button style={{backgroundColor: c}} onClick={() => handleSetColor(c)} title={c}>
							{props.role.color === c && <img src='/admin/asset/icon/check-light.svg' alt='Selected'/>}
						</button>
					)
				}
			</div>

			<hr class='RoleEditor-Separator' />

			<span class='RoleEditor-AbilityCategory'>Abilities</span>

			{renderAbilitySwitch(RoleAbility.ADMINISTRATOR, 'Administrator',
				'Bypass ability checks and role heirarchy. Use with caution.')}

			{renderAbilitySwitch(RoleAbility.VIEW_AUDIT_LOG, 'View Audit Log', 'View global and user Audit Logs.')}

			<span class='RoleEditor-AbilityCategory'>Media Management</span>

			{renderAbilitySwitch(RoleAbility.VIEW_MEDIA, 'View Media')}
			{renderAbilitySwitch(RoleAbility.MANAGE_MEDIA, 'Manage Media', 'Add and remove media assets.')}
			{renderAbilitySwitch(RoleAbility.REPLACE_MEDIA, 'Replace Media', 'Replace existing media assets with new ones.')}
			{renderAbilitySwitch(RoleAbility.EDIT_MEDIA_META, 'Edit Media Metadata', 'Edit Media titles and descriptions.')}

			<span class='RoleEditor-AbilityCategory'>Page Management</span>

			{renderAbilitySwitch(RoleAbility.VIEW_PAGES, 'View Pages')}
			{renderAbilitySwitch(RoleAbility.MANAGE_PAGES, 'Manage Pages', 'Add, remove, and relocate pages.')}
			{renderAbilitySwitch(RoleAbility.EDIT_PAGES, 'Edit Pages')}

			<span class='RoleEditor-AbilityCategory'>Theme Management</span>

			{renderAbilitySwitch(RoleAbility.VIEW_THEMES, 'View Themes')}
			{renderAbilitySwitch(RoleAbility.MANAGE_THEMES, 'Manage Themes', 'Add and remove themes.')}
			{renderAbilitySwitch(RoleAbility.TOGGLE_THEMES, 'Toggle Themes', 'Enable and disable themes.')}

			<span class='RoleEditor-AbilityCategory'>Plugin Management</span>

			{renderAbilitySwitch(RoleAbility.VIEW_PLUGINS, 'View Plugins')}
			{renderAbilitySwitch(RoleAbility.MANAGE_PLUGINS, 'Manage Plugins', 'Add and remove plugins.')}
			{renderAbilitySwitch(RoleAbility.TOGGLE_PLUGINS, 'Toggle Plugins', 'Enable and disable plugins.')}

			<span class='RoleEditor-AbilityCategory'>User Management</span>

			{renderAbilitySwitch(RoleAbility.VIEW_USERS, 'View Users')}
			{renderAbilitySwitch(RoleAbility.MANAGE_USERS, 'Manage Users', 'Invite and kick users.')}
			{renderAbilitySwitch(RoleAbility.RESET_USER_PASSWORD, 'Reset user Passwords',
				'Send password reset emails, and directly set user passwords.')}

			<span class='RoleEditor-AbilityCategory'>Role Management</span>

			{renderAbilitySwitch(RoleAbility.MANAGE_ROLES, 'Manage Roles', 'Add, remove, and reorder roles.', false)}
		</div>
	);
}
