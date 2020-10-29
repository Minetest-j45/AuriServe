import * as Preact from 'preact';

import './PageEditor.sass';

import ElementEditor from './ElementEditor';

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
					<div class='PageEditor-Sidebar'>{typeof(this.state.editing) === 'string' && this.renderEditor()}</div>
					<iframe class='PageEditor-Frame' ref={this.frame} src='/admin/page/' />
				</div>
			</div>
		);
	}

	private renderEditor() {
		let element = ObjectPath.traversePath(this.state.editing!, this.state.page.elements);
		if (Page.isInclude(element)) element = element.elem;

		return (
			<Preact.Fragment>
				<h1>{element.elem}</h1>
				<ElementEditor
					element={element}
					onSave={this.handleElementEditSave}
					onCancel={this.handleElementEditCancel}
				/>
			</Preact.Fragment>
		);
	}

	private setPage = (page: Page.Page) => {
		// Deep copy using JSON is safe, because page data is already JSON.
		this.setState({ page: JSON.parse(JSON.stringify(page)) });
		this.send('page', page);
	};

	private send(type: string, body?: any) {
		this.frame.current?.contentWindow?.postMessage({ type: type, body: body }, window.location.origin);
	}

	private receive = (evt: MessageEvent) => {
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
			console.log(type, body);
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
}

PageEditor.contextType = AppContext;
