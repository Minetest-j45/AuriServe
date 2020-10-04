import * as Preact from 'preact';

import './Page.sass';
import './PagePage.sass';

import Modal from '../Modal';
import CardHeader from '../CardHeader';
import { AppContext } from '../AppContext';
import ElementPropsEditor from '../ElementPropsEditor';
import DimensionTransition from '../DimensionTransition';

import { Page, Element } from '../../../common/interface/Page';
import { traversePath, combinePath } from '../../../common/util/ObjectPath';

interface Props {
}

interface State {
	pageData?: Page;
	editingElement?: string;
}

export default class PagePage extends Preact.Component<Props, State> {
	constructor(p: Props) {
		super(p);
	}

	componentDidMount() {
		let page: string = window.location.pathname.replace(/^\/admin\/pages\//g, '');
		this.context.getPageData(page).then((data: Page) => this.setState({ pageData: data }));
		this.context.refreshSiteData('elements');
	}

	render() {
		return (
			<div class="Page PagePage">
				<section class="Page-Card">
					{this.state.pageData && <Preact.Fragment>
						<CardHeader icon="/admin/asset/icon/element-dark.svg" title={this.state.pageData!.title}
							subtitle={this.state.pageData!.description || <em>No description.</em> as any as string} />

						{this.state.pageData.elements.main && this.renderElement(this.state.pageData.elements.main as Element, 'main')}

						{this.state.editingElement && this.renderEditor() }
					</Preact.Fragment>}
				</section>
			</div>
		);
	}

	private renderEditor() {
		const object = traversePath(this.state.editingElement!, this.state.pageData!.elements) as Element;
		const definition = this.context.data.elementDefs[object.elem];
		const editElement = this.context.plugins.elements.get(object.elem);
		
		return (
			<Modal onClose={this.stopEditing}>
				<DimensionTransition duration={200}>
					<div class="PagePage-EditElementForm">
						{editElement ?
							<editElement.element props={definition.props} setProps={this.setProps}/> :
							<ElementPropsEditor
								values={object.props}
								props={definition.props}
								setProps={this.setProps}
							/>
						}
					</div>
				</DimensionTransition>
			</Modal>
		);
	}

	private renderElement(elem: Element, path: string) {
		return (
			<div key={path}>
				<button class="PagePage-ElementButton" onClick={this.editElement.bind(this, path)}>{elem.elem}</button>
				{elem.children && <ul>{elem.children.map((c, key) => this.renderElement(c as Element, combinePath(path, 'children', key)))}</ul>}
			</div>
		);
	}

	private stopEditing = () => {
		this.setState({ editingElement: undefined });
	};

	private editElement = (path: string) => {
		this.setState({ editingElement: path });
	};

	private setProps = (object: any) => {
		let element = traversePath(this.state.editingElement!, this.state.pageData!.elements);
		const props = element.props;
		const newProps = Object.assign({}, props, object);
		element.props = newProps;
		this.forceUpdate();
	};
}

PagePage.contextType = AppContext;
