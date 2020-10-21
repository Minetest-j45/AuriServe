import * as Preact from 'preact';

import './RolesEditor.sass';

import RoleEditor from './RoleEditor';

import { AppContext } from '../../AppContext';

import { Role } from '../../../../common/interface/DBStructs';

interface Props {
	roles: Role[];
}

interface State {
	roles: Role[];
	editing: number;
}

export default class RolesEditor extends Preact.Component<Props, State> {
	constructor(p: Props) {
		super(p);

		this.setState({ editing: 0, roles: p.roles });
	}

	componentWillReceiveProps(props: Props) {
		this.setState({ roles: props.roles });
	}

	render() {
		return (
			<div class='RolesEditor'>
				<ul class='RolesEditor-RolesList'>
					<span class='RolesEditor-Label'>Roles</span>
					{this.state.roles.map((r: Role, i: number) => <li key={i}
						class={'RolesEditor-RolesListRole' + (i === this.state.editing ? ' active' : '')}
						style={{['--color']: r.color || '#334E68', ['--bg-color']: (r.color || '#334E68') + '22'}}>
						<button onClick={this.handleClickRole.bind(this, i)}><span>{r.identifier}</span></button>
					</li>)}
				</ul>
				{this.state.roles[this.state.editing] && <RoleEditor role={this.state.roles[this.state.editing]} setRole={this.handleSetRole} />}
			</div>
		);
	}

	private handleClickRole = (role: number) => {
		this.setState({ editing: role });
	};

	private handleSetRole = (role: Role) => {
		let roles = JSON.parse(JSON.stringify(this.state.roles));
		roles[this.state.editing] = role;
		this.setState({ roles: roles });
	};
}

RolesEditor.contextType = AppContext;
