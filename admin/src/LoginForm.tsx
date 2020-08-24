import Cookie from 'js-cookie';
import * as React from 'react';

import './LoginForm.scss';

import { AppContext } from "./AppContext";
import { SiteInfo } from "../../common/DBStructs";

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

export default class LoginForm extends React.PureComponent<{}, State> {
	constructor(props: any) {
		super(props);

		this.state = {
			username: "",
			password: "",
			warning: "",
			state: LoginState.UNAUTH
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
	}

	private handleSubmit(e: React.FormEvent): boolean {
		e.preventDefault();
		if (this.state.state == LoginState.PENDING) return false;
		this.setState({warning: ""});

		fetch("/admin/auth", {
			method: 'POST',
			cache: 'no-cache',
    	headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				user: this.state.username, 
				pass: this.state.password
			})
		}).then(async (r) => {
			const res = await r.text();
			if (r.status != 200) throw res;
			return res;
		}).then(res => {
			Cookie.set('tkn', res);
			this.setState({state: LoginState.AUTH});

			let returnImmediate = false;
			let data: SiteInfo | null = null;

			fetch("/admin/data", {
				cache: 'no-cache',
			}).then(r => r.json()).then(res => {
				if (returnImmediate) this.context.handleSiteData(res);
				else data = res;
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

	private handleUsernameChange(e: React.SyntheticEvent) {
		this.setState({username: (e.target as HTMLInputElement).value});
	}

	private handlePasswordChange(e: React.SyntheticEvent) {
		this.setState({password: (e.target as HTMLInputElement).value});
	}

	render() {
		const loading = this.state.state == LoginState.AUTH || this.state.state == LoginState.REDIRECT;
		const loaded = this.state.state == LoginState.REDIRECT;
		return <>
			<div className="LoginForm">
				<form className={"LoginForm-Card" + (loading ? " loading" : "") + (loaded ? " loaded" : "")} onSubmit={this.handleSubmit}>
					<div className="LoginForm-ProfilePlaceholder">
						<img className="card" src="/admin/asset/icon/account-light.svg"/>
						<img className="success" src="/admin/asset/icon/serve-light.svg"/>
					</div>
					<div className="LoginForm-FormContents">
						<input type="text" name="user" placeholder="Username" autoFocus required minLength={3} maxLength={32} 
							value={this.state.username} onChange={this.handleUsernameChange} disabled={loading}/>
						<input type="password" name="pass" placeholder="Password" required minLength={8} 
							value={this.state.password} onChange={this.handlePasswordChange} disabled={loading}/>
						<button disabled={loading}>Log In</button>
					</div>
				</form>
				<p className="LoginForm-Warning">{this.state.warning}</p>
			</div>
		</>;
	}
}

LoginForm.contextType = AppContext;
