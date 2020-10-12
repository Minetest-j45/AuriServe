import * as Preact from 'preact';

import './PageEditor.sass';

import EditElementTree from '../editor/EditElementTree';

import * as Page from '../../../../common/interface/Page';

interface Props {
	page: Page.Page;

	onSave: (page: Page.Page) => void; 
}

interface State {
	page: Page.Page;
	changes: number;
}

export default class PageEditor extends Preact.Component<Props, State> {
	constructor(p: Props) {
		super(p);

		// Deep copy using JSON is safe, because page data is already JSON.
		this.state = { page: JSON.parse(JSON.stringify(this.props.page)), changes: 0 };
	}

	render(_: any, state: State) {
		return (
			<div class="PageEditor">	
				<div class='PageEditor-Toolbar'>
					{!!this.state.changes && <div>
						<button onClick={this.handleSave}><img src='/admin/asset/icon/add-dark.svg'/><span>Save</span></button>
						<span class='PageEditor-Changes'>{this.state.changes} Change{this.state.changes != 1 && 's'}</span>
					</div>}
					<div/>
				</div>


				{typeof(state.page.elements.header) === 'object' && 
					this.renderEditor(state.page.elements.header as any, 'header')}
				
				{typeof(state.page.elements.main) === 'object' && 
					this.renderEditor(state.page.elements.main as any, 'main')}
				
				{typeof(state.page.elements.footer) === 'object' && 
					this.renderEditor(state.page.elements.footer as any, 'footer')}
			</div>
		);
	}

	private renderEditor(tree: Page.Child, part: 'header' | 'main' | 'footer') {
		return (
			<div class="PageEditor-Tree">
				<h2>{part.charAt(0).toUpperCase() + part.substr(1)}</h2>
				<EditElementTree tree={tree} onChange={this.handleChange.bind(this, part)} />
			</div>
		);
	}

	private handleChange = (part: 'header' | 'main' | 'footer', tree: Page.Child) => {
		let newPage = JSON.parse(JSON.stringify(this.state.page));
		newPage.elements[part] = tree;

		this.setState({ changes: this.state.changes + 1, page: newPage });
	}

	private handleSave = () => {
		this.setState({ changes: 0 });

		let page: Page.Page = JSON.parse(JSON.stringify(this.state.page));
		page.elements.header && this.recursivelyCleanExpansion(page.elements.header);
		page.elements.footer && this.recursivelyCleanExpansion(page.elements.footer);
		this.recursivelyCleanExpansion(page.elements.main);

		this.props.onSave(page);
	}

	private recursivelyCleanExpansion(tree: Page.Child) {
		if (Page.isInclude(tree)) {
			if (!tree.override) tree.override = {};
			this.recursivelyCleanOverrides(tree.elem as Page.Element, tree.override);
			delete tree.elem;
		}

		(Page.isInclude(tree) ? tree.elem : tree)?.children?.forEach(e => this.recursivelyCleanExpansion(e));
	}

	private recursivelyCleanOverrides(tree: Page.Element, overrides: Page.IncludeProps) {
		if (tree.exposeAs && tree.props) overrides[tree.exposeAs] = tree.props;
		tree.children?.forEach(e => Page.isElement(e) && this.recursivelyCleanOverrides(e, overrides));
	}
}
