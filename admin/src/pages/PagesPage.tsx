import * as Preact from 'preact';

import './Page.scss';
import './PagesPage.sass';

import Modal from "../Modal";
import CardHeader from "../CardHeader";
import CreateElementForm from "../CreateElementForm";

import { AppContext } from "../AppContext";

interface State {
	create: boolean;
}

export default class PagesPage extends Preact.Component<{}, State> {
	constructor(props: {}) {
		super(props);
		this.state = { create: false };

		this.toggleCreateElement = this.toggleCreateElement.bind(this);
	}

	private toggleCreateElement() {
		this.setState({ create: !this.state.create });
	}

	render() {
		return (
			<AppContext.Consumer>{_ =>
				<div className="Page PagesPage">
					<section className="Page-Card">
						<CardHeader icon="/admin/asset/icon/element-dark.svg" title="Manage Pages" 
							subtitle={`Manage site pages and elements.`} />
						<div className="PagesPage-Toolbar">
							<button className="PagesPage-Toolbar-Button" onClick={this.toggleCreateElement}>
								<img src="/admin/asset/icon/add-dark.svg"/><span>Create new Element</span>
							</button>
						</div>
					</section>

					{this.state.create && <Modal>
						<CreateElementForm onCancel={this.toggleCreateElement}/>
					</Modal>}
				</div>
			}</AppContext.Consumer>
		);
	}
}

PagesPage.contextType = AppContext;
