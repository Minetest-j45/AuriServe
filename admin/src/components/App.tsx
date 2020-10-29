import Cookie from 'js-cookie';
import * as Preact from 'preact';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import './App.sass';

import AppHeader from './AppHeader';
import MainPage from './pages/MainPage';
import PagePage from './pages/PagePage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import PagesPage from './pages/PagesPage';
import MediaPage from './pages/MediaPage';
import UsersPage from './pages/UsersPage';
import ThemesPage from './pages/ThemesPage';
import PluginsPage from './pages/PluginsPage';

import PageEditorInner from './editor/PageEditorInner';

import { Page } from '../../../common/interface/Page';
import { AppContext, AppContextData } from '../AppContext';
import { AdminDefinition } from '../../../common/interface/Element';
import { SiteData, SiteDataSpecifier } from '../../../common/interface/SiteData';

declare global { interface Window { serve: any } }

enum AppState { QUERYING, LOGIN, ADMIN }
enum PluginState { SAFE, UNLINKED, LINKED }

interface State {
	appState: AppState;
	pluginState: PluginState;
	contextData: AppContextData;
}

export default class App extends Preact.Component<{}, State> {
	constructor(props: any) {
		super(props);

		const tkn = Cookie.get('tkn');

		this.state = {
			contextData: {
				getPageData: this.getPageData,
				refreshSiteData: this.refreshSiteData,
				handleSiteData: this.handleSiteData,
				plugins: { elements: new Map() },
				data: {}
			},
			appState: tkn ? AppState.QUERYING : AppState.LOGIN,
			pluginState: PluginState.UNLINKED
		};

		if (tkn) this.refreshSiteData();

		if (tkn) this.refreshSiteData('info', 'users', 'roles').then(
			() => this.refreshSiteData('pages', 'media', 'themes', 'plugins', 'elements'));
	}

	render() {
		return (
			<AppContext.Provider value={this.state.contextData!}>
				{this.state.appState === AppState.LOGIN &&
				<div class='App'>
					<div class='AppWrap'>
						<LoginPage/>
					</div>
				</div>}
				{this.state.appState === AppState.ADMIN &&
				<Router basename='/admin'>
					<Switch>
						<Route exact path='/page' component={PageEditorInner as any} />
						<Route strict path='/pages/' component={PagePage as any} />
						<Route>
							<div class='App'>
								<AppHeader/>
								<div class='App-Wrap'>
									<Switch>
										<Redirect exact from='/' to='/home'/>
										<Route exact path='/home' component={MainPage as any}/>
										<Route exact path='/pages' component={PagesPage as any}/>
										<Route exact path='/media' component={MediaPage as any}/>
										<Route exact path='/themes' component={ThemesPage as any}/>
										<Route exact path='/plugins' component={PluginsPage as any}/>
										<Route exact path='/users' component={UsersPage as any} />

										<Route path='/users/' component={UserPage as any}/>
									</Switch>
								</div>
							</div>
						</Route>
					</Switch>
				</Router>}
			</AppContext.Provider>
		);
	}

	private loadPlugins = (): PluginState => {
		let pluginState = this.state.pluginState;

		if (pluginState === PluginState.UNLINKED) {
			const plugins: { pluginScripts: string[]; pluginStyles: string[] } =
				JSON.parse((document.querySelector('#plugins') as HTMLScriptElement).innerText);

			window.serve = {
				registerElement: (elem: AdminDefinition) => {
					let contextData = Object.assign({}, this.state.contextData);
					contextData.plugins = Object.assign({}, contextData.plugins);
					contextData.plugins.elements.set(elem.identifier, elem);

					this.setState({ contextData: contextData });
				}
			};

			plugins.pluginScripts.forEach((scr: string) => {
				const tag = document.createElement('script');
				tag.src = '/plugin/' + scr;
				tag.async = true;
				document.head.appendChild(tag);
			});

			plugins.pluginStyles.forEach((styl: string) => {
				const tag = document.createElement('link');
				tag.rel = 'stylesheet';
				tag.href = '/plugin/' + styl;
				document.head.appendChild(tag);
			});

			pluginState = PluginState.LINKED;
		}

		return pluginState;
	};

	private getPageData = async (page: string): Promise<Page> => {
		try {
			const r = await fetch('/admin/pages/data/', {
				method: 'POST',
				cache: 'no-cache',
	    	headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({ page: page })
			});
			if (r.status !== 200) throw 'Invalid credentials.';
			return await r.json();
		}
		catch (e) {
			Cookie.remove('tkn');
			location.href = '/admin';
			return {} as Page;
		}
	};

	private refreshSiteData = async (...types: SiteDataSpecifier[]): Promise<Partial<SiteData>> => {
		try {
			let res = await fetch('/admin/data/' + types.join('&'), { cache: 'no-cache' });
			if (res.status !== 200) throw 'Invalid credentials.';
			let json = await res.json();
			this.handleSiteData(json);
			return this.state.contextData.data;
		}
		catch {
			Cookie.remove('tkn');
			location.href = '/admin';
			return undefined as any;
		}
	};

	private handleSiteData = (data: Partial<SiteData>): void => {
		// console.log(data);
		const pluginState = this.loadPlugins();

		let contextData = Object.assign({}, this.state.contextData);
		contextData.data = Object.assign({}, contextData.data, data);

		this.setState({
			contextData: contextData,
			appState: AppState.ADMIN,
			pluginState: pluginState
		});
	};
}
