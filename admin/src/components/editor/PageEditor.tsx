import * as Preact from 'preact';

import './PageEditor.sass';

import ElementEditor from './ElementEditor';
import DimensionTransition from '../DimensionTransition';

import * as Page from '../../../../common/interface/Page';
import * as ObjectPath from '../../../../common/util/ObjectPath';

import { AppContext } from '../../AppContext';

interface Props {
	path: string;
	page: Page.Page;

	onSave: (page: Page.Page) => void;
}

interface State {
	page: Page.Page;
	editing?: string;
}

export default class PageEditor extends Preact.Component<Props, State> {
	frame: Preact.RefObject<HTMLIFrameElement>;

	constructor(p: Props) {
		super(p);
		this.frame = Preact.createRef();
	}

	componentWillMount() {
		window.addEventListener('message', this.receive);
		this.setPage(this.props.page);
	}

	componentWillUnmount() {
		window.removeEventListener('message', this.receive);
	}

	render() {
		return (
			<div class='App'>
				<div class='PageEditor'>
					<div class='PageEditor-Header'>
						<h1>Editing {this.props.path}</h1>
						<div>
							<button class='PageEditor-HeaderResetButton' onClick={this.handleReset}>Reset</button>
							<button class='PageEditor-HeaderSaveButton' onClick={this.handleSave}>Save</button>
						</div>
					</div>
					<iframe class='PageEditor-Frame' ref={this.frame} src='/admin/page/' />

					{typeof(this.state.editing) === 'string' && this.renderEditor()}
				</div>
			</div>
		);
	}

	private renderEditor() {
		let element = ObjectPath.traversePath(this.state.editing!, this.state.page.elements);
		if (Page.isInclude(element)) element = element.elem;

		return (
			<div class='PageEditor-EditorWrap'>
				<DimensionTransition duration={200}>
					<div class='PageEditor-Editor'>
						<h1>{element.elem}</h1>
						<ElementEditor
							element={element}
							onSave={this.handleElementEditSave}
							onCancel={this.handleElementEditCancel}
						/>
					</div>
				</DimensionTransition>
			</div>
		);
	}

	private setPage = (page: Page.Page) => {
		// Deep copy using JSON is safe, because page data is already JSON.
		this.setState({ page: JSON.parse(JSON.stringify(page)) });
		this.send('page', page);
	};

	private send(type: string, body?: any) {
		this.frame.current?.contentWindow?.postMessage({ _as: true, type: type, body: body }, window.location.origin);
	}

	private receive = (evt: MessageEvent) => {
		// Return if the message was not meant for us.
		if (evt.origin !== window.location.origin || !evt.data._as) return;

		let type = evt.data.type as string;
		let body = evt.data.body as any;

		switch (type) {
		case 'req-page':
			this.send('page', this.state.page);
			break;

		case 'page':
			this.setPage(body);
			break;

		case 'edit':
			this.setState({ editing: body });
			break;

		default:
			console.error(`Unknown data recieved, type '${type}', body:`, body);
			break;
		}
	};

	private handleElementEditCancel = () => {
		this.setState({ editing: undefined });
	};

	private handleElementEditSave = (props: any) => {
		const element = ObjectPath.traversePath(this.state.editing!, this.state.page.elements);
		const changed = JSON.stringify(element.props) !== JSON.stringify(props);

		if (!changed) return this.setState({ editing: undefined });

		element.props = props;
		this.send('page', this.state.page);
		this.setState({ editing: undefined });
	};

	private handleReset = () => {
		this.setPage(this.props.page);
	};

	private recursivelyShrinkIncludes(node: Page.Child) {
		if (Page.isInclude(node))
			delete node.elem;
		else
			(node.children || []).forEach(c => this.recursivelyShrinkIncludes(c));
	};

	private handleSave = () => {
		// Deep copy using JSON is safe, because page data is already JSON.
		let page = JSON.parse(JSON.stringify(this.state.page));

		if (page.elements.header) this.recursivelyShrinkIncludes(page.elements.header);
		if (page.elements.main) this.recursivelyShrinkIncludes(page.elements.main);
		if (page.elements.footer) this.recursivelyShrinkIncludes(page.elements.footer);

		this.props.onSave(page);
	};
}

PageEditor.contextType = AppContext;
