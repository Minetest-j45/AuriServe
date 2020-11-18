import * as Preact from 'preact';

import './UserRolesList.sass';

import { AppContext, AppContextData } from '../AppContext';

import { User, Role } from '../../../common/interface/DBStructs';

interface Props {
	user: Omit<User, 'pass'>;
	wrap?: boolean;
	edit?: boolean;
}

interface State {
	editing: boolean;
}

export default class UserRolesList extends Preact.Component<Props, State> {
	ref: Preact.RefObject<HTMLDivElement>;

	constructor(p: Props) {
		super(p);
		this.ref = Preact.createRef();
	}

	render(props: Props) {
		return (
			<AppContext.Consumer>{ctx =>
				<ul class={'UserRolesList' + (this.props.wrap ? ' Wrap' : '')}>
					{props.user.roles?.map(r => this.renderRole(r, ctx.data.roles?.filter(role => role.identifier === r)[0]))}
					{props.edit && <button class='UserRolesList-Item UserRolesList-Add' onClick={this.handleToggleAddRole}>
						<img src='/admin/asset/icon/add-dark.svg' alt='Add'/>
						{this.state.editing && this.renderAddRoleForm(ctx)}
					</button>}
				</ul>
			}</AppContext.Consumer>
		);
	}

	componentWillUnmount() {
		document.getElementsByTagName('body')[0].removeEventListener('mouseup', this.handleClickCancel);
		document.getElementsByTagName('body')[0].removeEventListener('touchend', this.handleClickCancel);
	}

	private renderRole(identifier: string, role?: Role) {
		let style: any = {};
		if (role?.color) {
			style['--color'] = role.color;
			style['--bg-color'] = role.color + '66';
		}

		return (
			<li class='UserRolesList-Item' style={style}>
				<button class={'UserRolesList-ItemButton' + (this.props.edit ? ' Active' : '')}
					onClick={this.props.edit ? this.handleRemoveRole.bind(this, identifier) : undefined}>
					<img src='/admin/asset/icon/remove-light.svg' alt='Remove' />
				</button>
				<span>{identifier}</span>
			</li>
		);
	}

	private renderAddRoleForm(ctx: AppContextData) {
		return (
			<div class='UserRolesList-AddRoleForm' ref={this.ref} onClick={e => e.stopPropagation()}>
				<p class='UserRolesList-AddRoleFormHeader'>Add Role</p>
				<ul>
					{(ctx.data.roles || []).filter(role => !this.props.user.roles?.includes(role.identifier)).map(role => <li>
						<button style={role.color && {['--color']: role.color} as any} onClick={this.handleAddRole.bind(this, role.identifier)}>
							{role.identifier}</button>
					</li>)}
				</ul>
			</div>
		);
	}

	private handleRemoveRole = (role: string) => {
		fetch('/admin/users/role/remove', {
			method: 'POST',
			cache: 'no-cache',
    	headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({ user: this.props.user.identifier, role: role })
		}).then(r => r.json()).then(this.context.handleSiteData);
	};

	private handleAddRole = (role: string) => {
		fetch('/admin/users/role/add', {
			method: 'POST',
			cache: 'no-cache',
    	headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({ user: this.props.user.identifier, role: role })
		}).then(r => r.json()).then(this.context.handleSiteData);

		this.handleToggleAddRole();
	};

	private handleClickCancel = (e: MouseEvent | TouchEvent) => {
		let x = e.target as HTMLElement;

		while (x) {
			if (x === this.ref.current) return;
			x = x.parentNode as HTMLElement;
		}

		this.handleToggleAddRole();
	};

	private handleToggleAddRole = () => {
		this.setState({ editing: !this.state.editing}, () => {
			if (this.state.editing) {
				document.getElementsByTagName('body')[0].addEventListener('mouseup', this.handleClickCancel);
				document.getElementsByTagName('body')[0].addEventListener('touchend', this.handleClickCancel);
			}
			else {
				document.getElementsByTagName('body')[0].removeEventListener('mouseup', this.handleClickCancel);
				document.getElementsByTagName('body')[0].removeEventListener('touchend', this.handleClickCancel);
			}
		});
	};
}

UserRolesList.contextType = AppContext;
