import Cookie from 'js-cookie';
import * as Preact from 'preact';
import { useState } from 'preact/hooks';
import { useSiteData } from '../../Hooks';

import './LoginPage.scss';

enum LoginState { UNAUTH, PENDING, AUTH, REDIRECT }

export default function LoginPage() {
	const [ ,, mergeData ] = useSiteData();

	const [ username, setUsername ] = useState<string>('');
	const [ password, setPassword ] = useState<string>('');

	const [ state, setState ] = useState<LoginState>(LoginState.UNAUTH);
	const [ warning, setWarning ] = useState<string>('');

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		try {
			let data: any = null;
			let returnImmediate = false;

			if (state === LoginState.PENDING)
				throw 'Attempt to send request while already logging in.';

			setTimeout(() => setState(LoginState.REDIRECT), 500);
			setTimeout(() => {
				if (data) mergeData(data);
				else returnImmediate = true;
			}, 650);

			setWarning('');

			const r = await fetch('/admin/auth', {
				method: 'POST', cache: 'no-cache',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					user: username,
					pass: password
				})
			});

			const res = await r.text();
			if (r.status !== 200) throw res;
			
			Cookie.set('tkn', res, { sameSite: 'Lax' });
			setState(LoginState.AUTH);

			data = await (await fetch('/admin/data', { cache: 'no-cache' })).json();
			if (returnImmediate) mergeData(data);
		}
		catch(err) {
			setState(LoginState.UNAUTH);
			setWarning(err);
		}

		return false;
	};
	
	const loading = state === LoginState.AUTH || state === LoginState.REDIRECT;
	const loaded = state === LoginState.REDIRECT;

	return (
		<div class='LoginPage'>
			<div class='LoginPage-Gradient' />
			<div class='LoginPage-Wrap'>
				<form class={'LoginPage-Card' + (loading ? ' loading' : '') + (loaded ? ' loaded' : '')} onSubmit={handleSubmit}>
					<div class='LoginPage-ProfilePlaceholder' role='heading' aria-level='1' aria-label='Log In'>
						<img class='card' src='/admin/asset/icon/account-light.svg' alt=''/>
						<img class='success' src='/admin/asset/icon/serve-light.svg' alt=''/>
					</div>
					<div class='LoginPage-FormContents'>

						<input
							type='text'
							autoComplete='username'
							
							autoFocus
							required
							minLength={3}
							maxLength={32}

							aria-label='Username'
							placeholder='Username'
							
							value={username}
							onInput={(evt: any) => setUsername(evt.target.value)}
							onChange={(evt: any) => setUsername(evt.target.value)}

							disabled={loading}
						/>

						<input
							type='password'
							autoComplete={'current-password'}
							
							required
							minLength={8}
							
							aria-label='Password'
							placeholder='Password'
							
							value={password}
							onInput={(evt: any) => setPassword(evt.target.value)}
							onChange={(evt: any) => setPassword(evt.target.value)}

							disabled={loading}
						/>

						<button disabled={loading}>Log In</button>
					</div>
				</form>

				<p class='LoginPage-Warning'>{warning}</p>
			</div>
		</div>
	);
}
