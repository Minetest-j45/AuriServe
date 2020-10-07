import * as Preact from 'preact';

import './EditElementTree.sass';

import Modal from '../Modal';
import ElementEditor from './ElementEditor';

import DimensionTransition from '../DimensionTransition';

import { Element } from '../../../../common/interface/Page';
import * as ObjectPath from '../../../../common/util/ObjectPath';

interface Props {
	tree: Element;
}

interface State {
	tree: Element;
	editing?: string;
}

export default class EditElementTree extends Preact.Component<Props, State> {
	constructor(p: Props) {
		super(p);
		
		// Deep copy using JSON is safe, because page data is already JSON.
		this.state = { tree: JSON.parse(JSON.stringify(this.props.tree)) };
	}

	render() {
		return (
			<div class='EditElementTree'>
				{this.renderElement(this.state.tree, '')}
				{typeof(this.state.editing) === 'string' && <Modal>
					<DimensionTransition duration={200}>
						<ElementEditor element={ObjectPath.traversePath(this.state.editing!, this.state.tree)} />
					</DimensionTransition>
				</Modal> }
			</div>
		);
	}

	private renderElement(elem: Element, path: string) {
		return (
			<div key={path}>
				<button class='EditElementTree-TreeItem' onClick={this.handleEdit.bind(this, path)} disabled={!elem.props}>{elem.elem}</button>
				{elem.children && <ul>{elem.children.map((c, key) =>
					this.renderElement(c as Element, ObjectPath.combinePath(path, 'children', key)))}</ul>}
			</div>
		);
	}

	private handleEdit = (path: string) => {
		this.setState({ editing: path });
	};

	// private handleStopEdit = () => {
	// 	this.setState({ editing: undefined });
	// };

	// private handleSetProps = (object: any) => {
	// 	let element = ObjectPath.traversePath(this.state.editing!, this.state.tree);
	// 	const props = element.props;
	// 	const newProps = Object.assign({}, props, object);
	// 	element.props = newProps;
	// 	this.forceUpdate();
	// };
}
