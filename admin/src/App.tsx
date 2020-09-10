import Cookie from 'js-cookie';
import * as React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import './App.scss';

import LoginForm from "./LoginForm"
import AppHeader from "./AppHeader"
import MainPage from "./pages/MainPage"
import PagesPage from "./pages/PagesPage"
import MediaPage from "./pages/MediaPage"
import ThemesPage from "./pages/ThemesPage"
import PluginsPage from "./pages/PluginsPage"

import SiteData from "../../common/interface/SiteData";
import { AppContext, AppContextData } from "./AppContext";

enum AppState {
	QUERYING,
	LOGIN,
	ADMIN
}

interface State {
	state: AppState;
	contextData: AppContextData;
}


export default class App extends React.Component<{}, State> {
	constructor(props: any) {
		super(props);

		const tkn = Cookie.get('tkn');
		this.handleSiteData = this.handleSiteData.bind(this);
		this.state = { state: tkn ? AppState.QUERYING : AppState.LOGIN, contextData: { handleSiteData: this.handleSiteData, data: null as any } };

		if (tkn) fetch("/admin/data", {
			cache: 'no-cache',
		}).then(r => {
			if (r.status != 200) throw "Invalid credentials.";
			return r.json()
		}).then(res => {
			this.handleSiteData(res);
		}).catch(() => {
			Cookie.remove('tkn');
			location.href = '/admin';
		});
	}

	private handleSiteData(data: SiteData) {
		console.log(data);
		this.setState({ contextData: { handleSiteData: this.handleSiteData, data: data }, state: AppState.ADMIN });
	}

	render() {
		return (
			<AppContext.Provider value={this.state.contextData!}>
				<div className="App">
					{this.state.state == AppState.LOGIN && <LoginForm/>}
					{this.state.state == AppState.ADMIN &&
						<div className="App-Wrap">
							<Router basename="/admin">
								<AppHeader/>
								<Switch>
									<Redirect exact from="/" to="/home"/>
									<Route exact path="/home" component={MainPage}/>
									<Route exact path="/pages" component={PagesPage}/>
									<Route exact path="/media" component={MediaPage}/>
									<Route exact path="/themes" component={ThemesPage}/>
									<Route exact path="/plugins" component={PluginsPage}/>
								</Switch>
							</Router>
							
						</div>}
				</div>
			</AppContext.Provider>
		);
	}
}
