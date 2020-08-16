import Cookie from 'js-cookie';
import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.scss';

import LoginForm from "./LoginForm"
import AppHeader from "./AppHeader"
import MainPage from "./pages/MainPage"

import { SiteData } from "../../common/SiteData"

enum AppState {
	QUERYING,
	LOGIN,
	ADMIN
}

interface State {
	data?: SiteData;
	state: AppState;
}

export default class App extends React.Component<{}, State> {
	constructor(props: any) {
		super(props);

		const tkn = Cookie.get('tkn');

		this.state = { state: tkn ? AppState.QUERYING : AppState.LOGIN };
		this.handleSiteData = this.handleSiteData.bind(this);

		if (tkn) fetch("/admin/data", {
			cache: 'no-cache',
		}).then(r => r.json()).then(res => {
			this.handleSiteData(res);
		});
	}

	private handleSiteData(data: SiteData) {
		this.setState({ data: data, state: AppState.ADMIN });
	}

	render() {
		return (
			<div className="App">
				{this.state.state == AppState.LOGIN && 
					<LoginForm handleSiteData={this.handleSiteData} />}

				{this.state.state == AppState.ADMIN &&
					<div className="App-Wrap">
						<Router basename="/admin">
							<AppHeader/>
							<Switch>
								<Route exact path="/">
									<MainPage data={this.state.data!}/>
								</Route>
								<Route exact path="/media">
									<p>media</p>
								</Route>
								<Route exact path="/pages">
									<p>pages</p>
								</Route>
							</Switch>
						</Router>
					</div>}
			</div>
		);
	}
}
