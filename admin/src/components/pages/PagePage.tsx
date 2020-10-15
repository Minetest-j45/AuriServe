import * as Preact from 'preact';

import './Page.sass';
import './PagePage.sass';

import CardHeader from '../CardHeader';
import { AppContext } from '../../AppContext';

import PageEditor from '../editor/PageEditor';

import * as Page from '../../../../common/interface/Page';

interface Props {
}

interface State {
	page?: Page.Page;
}

export default class PagePage extends Preact.Component<Props, State> {
	constructor(p: Props) {
		super(p);
	}

	componentDidMount() {
		let page: string = window.location.pathname.replace(/^\/admin\/pages\//g, '');
		this.context.getPageData(page).then((page: Page.Page) => this.setState({ page: page }));
		this.context.refreshSiteData('elements');
	}

	render() {
		return (
			<div class='Page PagePage'>
				<section class='Page-Card'>
					{this.state.page && <div>
						<CardHeader icon='/admin/asset/icon/element-dark.svg' title={this.state.page!.title}
							subtitle={this.state.page!.description || <em>No description.</em> as any as string} />
						{this.state.page && <PageEditor page={this.state.page} onSave={this.handleSave} />}
					</div>}
				</section>
			</div>
		);
	}

	handleSave = (page: Page.Page) => {
		const pagePath: string = window.location.pathname.replace(/^\/admin\/pages\//g, '');

		fetch('/admin/pages/update', {
			cache: 'no-cache',
			method: 'POST',
    	headers: {'Content-Type': 'application/json'},
    	body: JSON.stringify({ path: pagePath, body: page })
		});
	};
}

PagePage.contextType = AppContext;
