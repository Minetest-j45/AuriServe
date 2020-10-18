import Cookie from 'js-cookie';
import * as Preact from 'preact';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import './App.scss';

import LoginForm from './LoginForm';
import AppHeader from './AppHeader';
import MainPage from './pages/MainPage';
import PagePage from './pages/PagePage';
import PagesPage from './pages/PagesPage';
import MediaPage from './pages/MediaPage';
import UsersPage from './pages/UsersPage';
import ThemesPage from './pages/ThemesPage';
import PluginsPage from './pages/PluginsPage';

import { Page } from '../../../common/interface/Page';
import { AppContext, AppContextData } from '../AppContext';
import { AdminDefinition } from '../../../common/interface/Element';
import { SiteData, SiteDataSpecifier } from '../../../common/interface/SiteData';

declare global {
	interface Window { serve: any }
}

enum AppState {
	QUERYING,
	LOGIN,
	ADMIN
}

enum PluginState {
	SAFE,
	UNLINKED,
	LINKED
}

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
				data: null as any
			},
			appState: tkn ? AppState.QUERYING : AppState.LOGIN,
			pluginState: PluginState.UNLINKED
		};

		if (tkn) this.refreshSiteData('info', 'users').then(
			() => this.refreshSiteData('pages', 'media', 'themes', 'plugins', 'elements'));
	}

	render() {
		return (
			<AppContext.Provider value={this.state.contextData!}>
				<div className="App">

					{this.state.appState === AppState.LOGIN && <LoginForm/>}
					{this.state.appState === AppState.ADMIN &&
					<div className="App-Wrap">
						<Router basename="/admin">
							<AppHeader/>
							<Switch>
								<Redirect exact from="/" to="/home"/>
								<Route exact path="/home" component={MainPage as any}/>
								<Route exact path="/pages" component={PagesPage as any}/>
								<Route exact path="/media" component={MediaPage as any}/>
								<Route exact path="/themes" component={ThemesPage as any}/>
								<Route exact path="/plugins" component={PluginsPage as any}/>
								<Route exact path="/users" component={UsersPage as any} />
								<Route path="/pages/" component={PagePage as any}/>
								{/* <Route path="/users/" component={UserPage as any}/>*/}
							</Switch>
						</Router>
					</div>}
				</div>
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

	private refreshSiteData = async (...types: SiteDataSpecifier[]): Promise<SiteData> => {
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

	private handleSiteData = (data: SiteData): void => {
		console.log(data);
		const pluginState = this.loadPlugins();

		let siteData = Object.assign({}, this.state.contextData.data);

		for (const key of Object.keys(data)) (siteData as any)[key] = (data as any)[key];

		if (!siteData.users) siteData.users = [];
		if (!siteData.media) siteData.media = [];
		if (!siteData.themes) siteData.themes = [];
		if (!siteData.plugins) siteData.plugins = [];

		if (!siteData.pages) siteData.pages = {};
		if (!siteData.elementDefs) siteData.elementDefs = {};

		this.setState({
			contextData: {
				getPageData: this.getPageData,
				refreshSiteData: this.refreshSiteData,
				handleSiteData: this.handleSiteData,
				plugins: this.state.contextData.plugins,
				data: siteData
			},
			appState: AppState.ADMIN,
			pluginState: pluginState
		});
	};
}
