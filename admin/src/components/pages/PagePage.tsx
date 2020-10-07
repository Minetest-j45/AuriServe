import * as Preact from 'preact';

import './Page.sass';
import './PagePage.sass';

import CardHeader from '../CardHeader';
import { AppContext } from '../AppContext';

import EditElementTree from '../editor/EditElementTree';

import { Page } from '../../../../common/interface/Page';

interface Props {
}

interface State {
	page?: Page;
}

export default class PagePage extends Preact.Component<Props, State> {
	constructor(p: Props) {
		super(p);
	}

	componentDidMount() {
		let page: string = window.location.pathname.replace(/^\/admin\/pages\//g, '');
		this.context.getPageData(page).then((page: Page) => this.setState({ page: page }));
		this.context.refreshSiteData('elements');
	}

	render() {
		return (
			<div class='Page PagePage'>
				<section class='Page-Card'>
					{this.state.page && <Preact.Fragment>
						<CardHeader icon='/admin/asset/icon/element-dark.svg' title={this.state.page!.title}
							subtitle={this.state.page!.description || <em>No description.</em> as any as string} />

						{typeof(this.state.page.elements.main) === 'object' && <EditElementTree tree={this.state.page.elements.main} />}
					</Preact.Fragment>}
				</section>
			</div>
		);
	}
}

PagePage.contextType = AppContext;
