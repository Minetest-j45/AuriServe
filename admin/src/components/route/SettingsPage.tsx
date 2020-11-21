import * as Preact from 'preact';
import { useEffect } from 'preact/hooks';
import { NavLink as Link, Switch, Route, Redirect } from 'react-router-dom';

import './SettingsPage.sass';

import * as Settings from './settings/Settings';

export default function SettingsPage() {
	useEffect(() => {
		document.body.style.overflowY = 'scroll';
		return () => document.body.style.overflowY = '';
	}, []);

	return (
		<div class='Page SettingsPage'>
			<div class='Settings-Aside'>
				<ul class='Settings-Nav'>
					<li><span class='SettingsPage-Label'>Settings</span></li>
					<li><Link activeClassName="active" to="/settings/overview">Overview</Link></li>
					<li><hr /></li>
					<li><Link activeClassName="active" to="/settings/themes">Themes</Link></li>
					<li><Link activeClassName="active" to="/settings/plugins">Plugins</Link></li>
					<li><hr /></li>
					<li><Link activeClassName="active" to="/settings/users">Users</Link></li>
					<li><Link activeClassName="active" to="/settings/roles">Roles</Link></li>
				</ul>
			</div>
			<div class='Settings-Main'>
				<Switch>
					<Route exact path='/settings/overview' component={Settings.Main as any} />
					<Route exact path='/settings/users' component={Settings.Users as any} />
					<Route exact path='/settings/roles' component={Settings.Roles as any} />
					<Route exact path='/settings/themes' component={Settings.Themes as any} />
					<Route exact path='/settings/plugins' component={Settings.Plugins as any} />

					<Redirect exact to='/settings/overview'/>
				</Switch>
			</div>
		</div>
	);
}
