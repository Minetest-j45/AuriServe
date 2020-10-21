import * as Preact from 'preact';

import './RoleEditor.sass';

import { Role, RoleAbility } from '../../../../common/interface/DBStructs';

interface Props {
	role: Role;
	setRole: (role: Role) => void;
}


export default class RoleEditor extends Preact.Component<Props, {}> {

	render() {
		return (
			<div class='RoleEditor'>
				<label class='RoleEditor-Field'>
					<span>Role Name</span>
					<input type='text' style={this.props.role.color && {color: this.props.role.color}} onChange={this.handleIdentifierChange}
						onInput={this.handleIdentifierChange} class='RoleEditor-IdentifierInput' value={this.props.role.identifier} />
				</label>

				<div class='RoleEditor-Field'>
					<span>Role Color</span>
					<div class='RoleEditor-ColorSelector'>
						<button class='RoleEditor-ColorTransparent' onClick={this.handleSetColor.bind(this, undefined)}>
							{!this.props.role.color && <img src='/admin/asset/icon/dash-light.svg' alt='Selected'/>}
						</button>

						{['#E12D39', '#F0B429', '#6CD410', '#17B897', '#0FB5BA', '#2BB0ED', '#0967D2', '#2251CC', '#8719E0', '#E019D0', '#DA127D',
							'#C52707', '#CB6E17', '#399709', '#048271', '#099AA4', '#127FBF', '#03449E', '#132DAD', '#690CB0', '#B30BA3', '#A30664']
							.map(c =>
								<button style={{backgroundColor: c}} onClick={this.handleSetColor.bind(this, c)} title={c}>
									{this.props.role.color === c && <img src='/admin/asset/icon/check-light.svg' alt='Selected'/>}
								</button>
							)
						}
					</div>

					<hr class='RoleEditor-Separator' />

					<span class='RoleEditor-AbilityCategory'>Abilities</span>

					{this.renderAbilitySwitch(RoleAbility.ADMINISTRATOR, 'Administrator',
						'Bypass ability checks and role heirarchy. Use with caution.')}

					{this.renderAbilitySwitch(RoleAbility.VIEW_AUDIT_LOG, 'View Audit Log', 'View global and user Audit Logs.')}

					<span class='RoleEditor-AbilityCategory'>Media Management</span>

					{this.renderAbilitySwitch(RoleAbility.VIEW_MEDIA, 'View Media')}
					{this.renderAbilitySwitch(RoleAbility.MANAGE_MEDIA, 'Manage Media', 'Add and remove media assets.')}
					{this.renderAbilitySwitch(RoleAbility.REPLACE_MEDIA, 'Replace Media', 'Replace existing media assets with new ones.')}
					{this.renderAbilitySwitch(RoleAbility.EDIT_MEDIA_META, 'Edit Media Metadata', 'Edit Media titles and descriptions.')}

					<span class='RoleEditor-AbilityCategory'>Page Management</span>

					{this.renderAbilitySwitch(RoleAbility.VIEW_PAGES, 'View Pages')}
					{this.renderAbilitySwitch(RoleAbility.MANAGE_PAGES, 'Manage Pages', 'Add, remove, and relocate pages.')}
					{this.renderAbilitySwitch(RoleAbility.EDIT_PAGES, 'Edit Pages')}

					<span class='RoleEditor-AbilityCategory'>Theme Management</span>

					{this.renderAbilitySwitch(RoleAbility.VIEW_THEMES, 'View Themes')}
					{this.renderAbilitySwitch(RoleAbility.MANAGE_THEMES, 'Manage Themes', 'Add and remove themes.')}
					{this.renderAbilitySwitch(RoleAbility.TOGGLE_THEMES, 'Toggle Themes', 'Enable and disable themes.')}

					<span class='RoleEditor-AbilityCategory'>Plugin Management</span>

					{this.renderAbilitySwitch(RoleAbility.VIEW_PLUGINS, 'View Plugins')}
					{this.renderAbilitySwitch(RoleAbility.MANAGE_PLUGINS, 'Manage Plugins', 'Add and remove plugins.')}
					{this.renderAbilitySwitch(RoleAbility.TOGGLE_PLUGINS, 'Toggle Plugins', 'Enable and disable plugins.')}

					<span class='RoleEditor-AbilityCategory'>User Management</span>

					{this.renderAbilitySwitch(RoleAbility.VIEW_USERS, 'View Users')}
					{this.renderAbilitySwitch(RoleAbility.MANAGE_USERS, 'Manage Users', 'Invite and kick users.')}
					{this.renderAbilitySwitch(RoleAbility.RESET_USER_PASSWORD, 'Reset user Passwords',
						'Send password reset emails, and directly set user passwords.')}

					<span class='RoleEditor-AbilityCategory'>Role Management</span>

					{this.renderAbilitySwitch(RoleAbility.MANAGE_ROLES, 'Manage Roles', 'Add, remove, and reorder roles.')}
				</div>
			</div>
		);
	}

	private renderAbilitySwitch(ability: RoleAbility, title: string, description?: string) {
		return (
			<Preact.Fragment>
				<label class='RoleEditor-AbilitySwitch'>
					<p class='RoleEditor-AbilitySwitchTitle'>{title}</p>
					{description && <p class='RoleEditor-AbilitySwitchDescription'>{description}</p>}

					<input type='checkbox' checked={this.props.role.abilities.filter(f => f === RoleAbility[ability]).length > 0}
						onChange={this.handleToggleAbility.bind(this, ability)}/>
				</label>
				<hr class='RoleEditor-Separator' />
			</Preact.Fragment>
		);
	}

	private handleSetColor = (color?: string) => {
		let role = Object.assign(JSON.parse(JSON.stringify(this.props.role)), { color: color });
		this.props.setRole(role);
	};

	private handleIdentifierChange = (e: any) => {
		let role = Object.assign(JSON.parse(JSON.stringify(this.props.role)), { identifier: e.target.value });
		this.props.setRole(role);
	};

	private handleToggleAbility = (ability: RoleAbility) => {
		const abilityStr = RoleAbility[ability];

		let role = Object.assign(JSON.parse(JSON.stringify(this.props.role)));
		if (role.abilities.filter((f: string) => f === abilityStr).length)
			role.abilities = role.abilities.filter((f: string) => f !== abilityStr);
		else role.abilities.push(abilityStr);

		this.props.setRole(role);
	};
}
