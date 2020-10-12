import * as Preact from 'preact';

import './EditElementTree.sass';

import Modal from '../Modal';
import ElementEditor from './ElementEditor';

import DimensionTransition from '../DimensionTransition';

import * as Page from '../../../../common/interface/Page';
import * as ObjectPath from '../../../../common/util/ObjectPath';

interface Props {
	tree: Page.Child;

	onChange: (tree: Page.Child) => void; 
}

interface State {
	tree: Page.Child;
	editing?: string;
}

export default class EditElementTree extends Preact.Component<Props, State> {
	constructor(p: Props) {
		super(p);

		// Deep copy using JSON is safe, because page data is already JSON.
		this.state = { tree: JSON.parse(JSON.stringify(this.props.tree)) };
	}

	render() {
		let element = undefined;
		if (typeof(this.state.editing) === 'string') {
			element = ObjectPath.traversePath(this.state.editing!, this.state.tree);
			if (Page.isInclude(element)) element = element.elem;
		}

		return (
			<div class='EditElementTree'>
				{this.renderNode(this.state.tree, '')}
				{typeof(this.state.editing) === 'string' && <Modal>
					<DimensionTransition duration={200}>
						<ElementEditor 
							element={element}
							onSave={this.handleEditSave}
							onCancel={this.handleEditCancel} />
					</DimensionTransition>
				</Modal> }
			</div>
		);
	}

	private renderNode(elem: Page.Child, path: string) {
		if (Page.isInclude(elem)) return this.renderIncludeNode(elem, path);
		else return this.renderElementNode(elem as Page.Element, path);
	}

	private renderElementNode(elem: Page.Element, path: string) {
		return (
			<div key={path}>
				<button class='EditElementTree-TreeItem' onClick={this.handleEdit.bind(this, path)} disabled={!elem.props}>{elem.elem}</button>
				{elem.children && <ul>{elem.children.map((c, key) =>
					this.renderNode(c, ObjectPath.combinePath(path, 'children', key)))}</ul>}
			</div>
		);
	}

	private renderIncludeNode(include: Page.Include, path: string) {
		const exposed = this.recursivelyFindExposed(include, '');

		return (
			<div class="EditElementTree-IncludeItem" key={path}>
				<ul>{exposed.map(c => this.renderElementNode(c.elem, ObjectPath.combinePath('elem', c.path)))}</ul>
			</div>
		);
	}

	private recursivelyFindExposed(elem: Page.Child, path: string): { elem: Page.Element, path: string}[] {
		let exposed: { elem: Page.Element, path: string }[] = [];

		if (Page.isElement(elem) && elem.exposeAs) 
			exposed.push({ elem: elem, path: path });

		((Page.isInclude(elem) ? elem.elem!.children : elem.children) || []).forEach((c, key) => {
			const childPath = ObjectPath.combinePath(path, 'children', key);
			exposed.push(...this.recursivelyFindExposed(c, childPath));
		});

		return exposed;
	}

	private handleEdit = (path: string) => {
		this.setState({ editing: path });
	};

	private handleEditCancel = () => {
		this.setState({ editing: undefined });
	};

	private handleEditSave = (props: any) => {
		const element = ObjectPath.traversePath(this.state.editing!, this.state.tree);
		const changed = JSON.stringify(element.props) !== JSON.stringify(props);

		if (changed) {
			element.props = props;
			this.props.onChange(JSON.parse(JSON.stringify(this.state.tree)));
		}

		this.setState({ editing: undefined });
	};
}
