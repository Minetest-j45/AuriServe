import * as Preact from 'preact';
import { NavLink as Link } from 'react-router-dom';

import './Page.sass';
import './PagesPage.sass';

import CardHeader from '../CardHeader';

import { AppContext } from '../../AppContext';

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
		this.context.refreshSiteData('elements', 'pages');
	}

	render() {
		return (
			<AppContext.Consumer>{ctx =>
				<div class="Page PagesPage">
					<section class="Page-Card">
						<CardHeader icon="/admin/asset/icon/document-dark.svg" title="Manage Pages"
							subtitle={'Manage site pages and elements.'} />

						{ctx.data.pages &&
							<ul class="PagesPage-Pages">
								{Object.keys(ctx.data.pages).sort((a, b) => a > b ? 1 : -1).map(p =>
									<li>
										<Link className="PagesPage-PageItem" to={'/pages/' + p}>
											<p class="PagesPage-PageItemTitle">{ctx.data.pages![p]!.title}</p>
											<p class="PagesPage-PageItemDescription">{ctx.data.pages![p].description || <em>No description</em>}</p>
											<p class="PagesPage-PageItemPath">{p}</p>
										</Link>
									</li>
								)}
							</ul>
						}

						{!ctx.data.pages && <h2 className='PagesPage-Notice'>Loading pages...</h2>}
						{ctx.data.pages && Object.keys(ctx.data.pages).length === 0 && <h2 className='PagesPage-Notice'>No pages found.</h2>}

					</section>
				</div>
			}</AppContext.Consumer>
		);
	}

	private toggleCreateElement() {
		this.setState({ create: !this.state.create });
	}
}

PagesPage.contextType = AppContext;
