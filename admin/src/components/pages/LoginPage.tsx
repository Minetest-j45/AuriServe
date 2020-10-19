import Cookie from 'js-cookie';
import * as Preact from 'preact';

import './LoginPage.scss';

import { AppContext } from '../../AppContext';
import { SiteInfo } from '../../../../common/interface/DBStructs';

enum LoginState {
	UNAUTH,
	PENDING,
	AUTH,
	REDIRECT
}

interface State {
	username: string;
	password: string;
	warning: string;
	state: LoginState;
}

export default class LoginPage extends Preact.Component<{}, State> {
	constructor(props: any) {
		super(props);

		this.state = {
			username: '',
			password: '',
			warning: '',
			state: LoginState.UNAUTH
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
	}

	render() {
		const loading = this.state.state === LoginState.AUTH || this.state.state === LoginState.REDIRECT;
		const loaded = this.state.state === LoginState.REDIRECT;
		return (
			<div className='LoginPage'>
				<form className={'LoginPage-Card' + (loading ? ' loading' : '') + (loaded ? ' loaded' : '')} onSubmit={this.handleSubmit}>
					<div className='LoginPage-ProfilePlaceholder' role='heading' aria-level='1' aria-label='Log In'>
						<img className='card' src='/admin/asset/icon/account-light.svg' alt=''/>
						<img className='success' src='/admin/asset/icon/serve-light.svg' alt=''/>
					</div>
					<div className='LoginPage-FormContents'>

						<input type='text' name='user' placeholder='Username' aria-label='Username'
							autoFocus required minLength={3} maxLength={32} autoComplete={'username'}
							value={this.state.username} onChange={this.handleUsernameChange} disabled={loading}/>

						<input type='password' name='pass' placeholder='Password' aria-label='Password'
							required minLength={8} autoComplete={'current-password'}
							value={this.state.password} onChange={this.handlePasswordChange} disabled={loading}/>

						<button disabled={loading}>Log In</button>
					</div>
				</form>
				<p className='LoginPage-Warning'>{this.state.warning}</p>
			</div>
		);
	}

	private handleSubmit(e: any): boolean {
		e.preventDefault();
		if (this.state.state === LoginState.PENDING) return false;
		this.setState({warning: ''});

		fetch('/admin/auth', {
			method: 'POST',
			cache: 'no-cache',
    	headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				user: this.state.username,
				pass: this.state.password
			})
		}).then(async (r) => {
			const res = await r.text();
			if (r.status !== 200) throw res;
			return res;
		}).then(res => {
			Cookie.set('tkn', res, { sameSite: 'Lax' });
			this.setState({state: LoginState.AUTH});

			let returnImmediate = false;
			let data: SiteInfo | null = null;

			fetch('/admin/data', {
				cache: 'no-cache'
			}).then(r => r.json()).then(r => {
				if (returnImmediate) this.context.handleSiteData(r);
				else data = r;
			});

			setTimeout(() => this.setState({state: LoginState.REDIRECT}), 450);
			setTimeout(() => {
				if (data) this.context.handleSiteData(data);
				else returnImmediate = true;
			}, 650);

		}).catch(err => {
			this.setState({state: LoginState.UNAUTH, warning: err});
		});

		e.preventDefault();
		return false;
	}

	private handleUsernameChange(e: any) {
		this.setState({username: e.target.value});
	}

	private handlePasswordChange(e: any) {
		this.setState({password: e.target.value});
	}
}

LoginPage.contextType = AppContext;
