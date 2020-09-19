import Cookie from 'js-cookie';
import * as Preact from 'preact';
import { Router, Route } from 'preact-router';

import './App.scss';

import Redirect from './Redirect';
import LoginForm from './LoginForm';
import AppHeader from './AppHeader';
import MainPage from './pages/MainPage';
import PagesPage from './pages/PagesPage';
import MediaPage from './pages/MediaPage';
import ThemesPage from './pages/ThemesPage';
import PluginsPage from './pages/PluginsPage';

import SiteData from '../../common/interface/SiteData';
import { AppContext, AppContextData } from './AppContext';
import { AdminDefinition } from '../../common/interface/Element';

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
		
		this.loadPlugins = this.loadPlugins.bind(this);
		this.handleSiteData = this.handleSiteData.bind(this);

		const tkn = Cookie.get('tkn');

		this.state = {
			contextData: {
				handleSiteData: this.handleSiteData,
				plugins: { elements: new Map() },
				data: null as any
			},
			appState: tkn ? AppState.QUERYING : AppState.LOGIN,
			pluginState: PluginState.UNLINKED
		};

		if (tkn) fetch('/admin/data', {
			cache: 'no-cache'
		}).then(r => {
			if (r.status !== 200) throw 'Invalid credentials.';
			return r.json();
		}).then(res => {
			this.handleSiteData(res);
		}).catch(() => {
			Cookie.remove('tkn');
			location.href = '/admin';
		});
	}

	render() {
		return (
			<AppContext.Provider value={this.state.contextData!}>
				<div className="App">

					{this.state.appState === AppState.LOGIN && <LoginForm/>}
					{this.state.appState === AppState.ADMIN &&
					<div className="App-Wrap">
						<AppHeader/>
						<Router>
							<Route path="/admin/home" component={MainPage}/>
							<Route path="/admin/pages" component={PagesPage}/>
							<Route path="/admin/media" component={MediaPage}/>
							<Route path="/admin/themes" component={ThemesPage}/>
							<Route path="/admin/plugins" component={PluginsPage}/>
							<Redirect default to="/admin/home"/>
						</Router>
					</div>}
				</div>
			</AppContext.Provider>
		);
	}

	private loadPlugins(): PluginState {
		let pluginState = this.state.pluginState;

		if (pluginState === PluginState.UNLINKED) {
			const plugins: { pluginScripts: string[]; pluginStyles: string[] } =
				JSON.parse((document.querySelector('#plugins') as HTMLScriptElement).innerText);

			console.log(plugins);

			window.serve = {
				registerElement: (elem: AdminDefinition) => {
					let contextData = Object.assign({}, this.state.contextData);
					contextData.plugins = Object.assign({}, contextData.plugins);
					contextData.plugins.elements.set(elem.identifier, elem);

					console.log(contextData);
					
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
	}

	private handleSiteData(data: SiteData) {
		const pluginState = this.loadPlugins();

		this.setState({
			contextData: {
				handleSiteData: this.handleSiteData,
				plugins: this.state.contextData.plugins,
				data: data
			},
			appState: AppState.ADMIN,
			pluginState: pluginState
		});
	}
}
