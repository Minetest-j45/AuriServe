import * as Preact from 'preact';
import { NavLink as Link } from 'react-router-dom';

import './Page.sass';
import './PagesPage.sass';

import Modal from '../Modal';
import CardHeader from '../CardHeader';
import CreateElementForm from '../editor/CreateElementForm';

import { AppContext } from '../AppContext';

interface State {
	create: boolean;
}

export default class PagesPage extends Preact.Component<{}, State> {
	constructor(props: {}) {
		super(props);
		this.state = { create: false };

		this.toggleCreateElement = this.toggleCreateElement.bind(this);
	}

	componentWillMount() {
		this.context.refreshSiteData('elements&pages');
	}

	render() {
		return (
			<AppContext.Consumer>{ctx =>
				<div class="Page PagesPage">
					<section class="Page-Card">
						<CardHeader icon="/admin/asset/icon/element-dark.svg" title="Manage Pages"
							subtitle={'Manage site pages and elements.'} />
						<div class="PagesPage-Toolbar">
							<button class="PagesPage-Toolbar-Button" onClick={this.toggleCreateElement}>
								<img src="/admin/asset/icon/add-dark.svg"/><span>Create new Element</span>
							</button>
						</div>

						<ul class="PagesPage-Pages">
							{Object.keys(ctx.data.pages).sort((a, b) => a > b ? 1 : -1).map(p =>
								<Link className="PagesPage-PageItem" to={'/pages/' + p}>
									<p class="PagesPage-PageItemTitle">{ctx.data.pages[p]!.title}</p>
									<p class="PagesPage-PageItemDescription">{ctx.data.pages[p].description || <em>No description</em>}</p>
									<p class="PagesPage-PageItemPath">{p}</p>
								</Link>
							)}
						</ul>

					</section>

					{this.state.create && <Modal>
						<CreateElementForm onCancel={this.toggleCreateElement}/>
					</Modal>}
				</div>
			}</AppContext.Consumer>
		);
	}

	private toggleCreateElement() {
		this.setState({ create: !this.state.create });
	}
}

PagesPage.contextType = AppContext;
