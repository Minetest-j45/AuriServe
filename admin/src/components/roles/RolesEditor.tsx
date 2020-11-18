import * as Preact from 'preact';
import { Prompt } from 'react-router-dom';

import './RolesEditor.sass';

import RoleEditor from './RoleEditor';
import SaveConfirmationModal from '../SaveConfirmationModal';

import { AppContext } from '../../AppContext';

import { Role } from '../../../../common/interface/DBStructs';

interface Props {
	roles: Role[];
}

interface State {
	roles: Role[];
	editing: number;
	changed: boolean;
}

export default class RolesEditor extends Preact.Component<Props, State> {
	constructor(p: Props) {
		super(p);

		this.setState({ editing: 0, changed: false, roles: [] });
		this.handleReset();
	}

	componentWillReceiveProps() {
		setTimeout(() => this.handleReset(), 0);
	}

	render() {
		return (
			<div class='RolesEditor'>
				<ul class='RolesEditor-RolesList'>
					<li><span class='RolesEditor-Label'>Roles</span></li>
					{this.state.roles.map((r: Role, i: number) => <li key={i}
						class={'RolesEditor-RolesListRole' + (i === this.state.editing ? ' active' : '')}
						style={{['--color']: r.color || '#334E68', ['--bg-color']: (r.color || '#334E68') + '22'} as any}>
						<button onClick={this.handleClickRole.bind(this, i)}><span>{r.identifier}</span></button>
					</li>)}
				</ul>
				{this.state.roles[this.state.editing] && <RoleEditor role={this.state.roles[this.state.editing]} setRole={this.handleSetRole} />}
				<SaveConfirmationModal active={this.state.changed} onReset={this.handleReset} onSave={this.handleSave} />
			  <Prompt when={this.state.changed} message='Are you sure you want to leave this page? Unsaved changes will be lost.'/>
			</div>
		);
	}

	private handleClickRole = (role: number) => {
		this.setState({ editing: role });
	};

	private handleSetRole = (role: Role) => {
		let roles = JSON.parse(JSON.stringify(this.state.roles));
		roles[this.state.editing] = role;

		if (!this.validateRoles(roles)) return this.forceUpdate();

		this.setState({ roles: roles, changed: JSON.stringify(roles) !== JSON.stringify(this.props.roles) });
	};

	private handleReset = () => {
		this.setState({ roles: this.props.roles, changed: false });
	};

	private handleSave = () => {
		fetch('/admin/roles/update', {
			method: 'POST',
			cache: 'no-cache',
    	headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(this.state.roles)
		}).then(r => r.json()).then(this.context.handleSiteData);
	};

	// Ensure that at least one role has the ADMINISTRATOR ability.

	private validateRoles = (roles: Role[]): boolean => {
		for (let role of roles)
			if (role.abilities.includes('ADMINISTRATOR'))
				return true;

		return false;
	};
}

RolesEditor.contextType = AppContext;
