import * as Preact from 'preact';

import './Page.sass';
import './PagesPage.sass';

import PageEditor from '../editor/PageEditor';

import { AppContext } from '../../AppContext';

import * as Page from '../../../../common/interface/Page';

interface State {
	path?: string;
	page?: Page.Page;
}

export default class PagesPage extends Preact.Component<{}, State> {
	constructor(props: {}) {
		super(props);
	}

	componentWillMount() {
		let path: string = window.location.pathname.replace(/^\/admin\/pages\//g, '');

		(async () => {
			await this.context.refreshSiteData('elements');
			let page = await this.context.getPageData(path);
			this.setState({ path: path, page: page });
		})();
	}

	render() {
		if (this.state.path && this.state.page) return (
			<PageEditor path={this.state.path} page={this.state.page} onSave={this.handleSave} />
		);
		return null;
	}

	handleSave = (page: Page.Page) => {
		const pagePath: string = window.location.pathname.replace(/^\/admin\/pages\//g, '');

		fetch('/admin/pages/update', {
			cache: 'no-cache',
			method: 'POST',
    	headers: {'Content-Type': 'application/json'},
    	body: JSON.stringify({ path: pagePath, body: page })
		}).then(() => {
			(this.props as any).history.push('/pages');
		});
	};
}

PagesPage.contextType = AppContext;
