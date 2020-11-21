import Cookie from 'js-cookie';
import * as Preact from 'preact';
import { useState, useEffect, useCallback } from 'preact/hooks';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import './App.sass';

import AppHeader from './AppHeader';
import * as Pages from './route/Pages';
import PageEditorControl from './route/editor/PageEditorControlPage';
import PageEditorRenderer from './route/editor/PageEditorRendererPage';

import { AppContext, refreshSiteData } from '../AppContext';
import { SiteData } from '../../../common/interface/SiteData';

enum AppState { QUERYING, LOGIN, ADMIN };


/**
 * Main entry point for the application.
 * Handles authentication and context data.
 * Renders pages and navigation.
 */

export default function App() {
	const [ data, setData ] = useState<Partial<SiteData>>({});
	const [ appState, setAppState ] = useState<AppState>(() => Cookie.get('tkn') ? AppState.QUERYING : AppState.LOGIN);

	const mergeData = useCallback((data: Partial<SiteData>) => {
		setData((prevData: Partial<SiteData>) => { return { ...prevData, ...data }; });
		setAppState(AppState.ADMIN);
	}, []);

	useEffect(() => {
		if (appState !== AppState.QUERYING) return;
		refreshSiteData(mergeData, [ 'info', 'users', 'roles' ]).then(() =>
			refreshSiteData(mergeData, [ 'pages', 'media', 'themes', 'plugins', 'elements' ]));
	}, []);

	return (
		<AppContext.Provider value={{ data: data, mergeData: mergeData }}>
			{appState === AppState.LOGIN ?
				<div class='App'><div class='AppWrap'><Pages.Login/></div></div> :
				<Router basename='/admin'>
					<Switch>
						<Route exact path='/renderer' component={PageEditorRenderer as any} />
						<Route strict path='/pages/' component={PageEditorControl as any} />

						<Route>
							<div class='App'>
								<AppHeader/>
								<div class='App-Wrap'>
									<Switch>
										<Route exact path='/' component={Pages.Main as any}/>
										<Route exact path='/pages' component={Pages.Pages as any}/>
										<Route exact path='/media' component={Pages.Media as any}/>
										<Route path='/settings' component={Pages.Settings as any}/>

										<Route path='/users/' component={Pages.User as any}/>

										<Redirect exact to='/'/>
									</Switch>
								</div>
							</div>
						</Route>
					</Switch>
				</Router>
			}
		</AppContext.Provider>
	);
}
