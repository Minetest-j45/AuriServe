import * as Preact from 'preact';
import {Helmet} from 'react-helmet';

import './PageEditorInner.sass';

import * as Page from '../../../../common/interface/Page';
import * as ObjectPath from '../../../../common/util/ObjectPath';
import { AdminDefinition } from '../../../../common/interface/Element';

import { AppContext } from '../../AppContext';

interface State {
	page: Page.Page;

	hovered?: { path: string; elem: HTMLElement };
}

export default class PageEditorInner extends Preact.Component<{}, State> {
	componentWillMount() {
		window.addEventListener('message', this.receive);
		this.send('req-page');
	}

	componentWillUnmount() {
		window.removeEventListener('message', this.receive);
	}

	render() {
		console.log('rerender');
		if (!this.state.page) return;

		return (
			<Preact.Fragment>
				<Helmet>
					{this.context.data.themes?.map((t: any) => <link rel='stylesheet' href={`/theme/${t.identifier}.css`} />)}
				</Helmet>

				<header>{this.state.page?.elements?.header && this.renderTree(this.state.page.elements.header, 'header')}</header>
				<main>{this.state.page?.elements?.main && this.renderTree(this.state.page.elements.main, 'main')}</main>
				<footer>{this.state.page?.elements?.footer && this.renderTree(this.state.page.elements.footer, 'footer')}</footer>

				{this.state.hovered?.elem && this.renderFocusRing()}
			</Preact.Fragment>
		);
	}

	private renderTree(root: Page.Child, path: string): Preact.VNode | undefined {
		if (Page.isInclude(root)) root = root.elem as Page.Element;
		const element = this.context.plugins.elements.get(root.elem) as AdminDefinition;
		if (!element?.element) this.renderUndefined(root.elem);

		const InlineEditor = element.editing?.inlineEditor;
		const PropertyEditor = element.editing?.propertyEditor;

		if (InlineEditor) {
			return this.renderClickCapture(path, <InlineEditor {...root.props} setProps={this.handleSetProps.bind(this, path)}>
				{root.children?.map((child, key) => this.renderTree(child, ObjectPath.combinePath(path, 'children', key)))}
			</InlineEditor>, PropertyEditor !== false);
		}

		const Element = element.element;
		return this.renderClickCapture(path, <Element {...root.props}>
			{root.children?.map((child, key) => this.renderTree(child, ObjectPath.combinePath(path, 'children', key)))}
		</Element>);
	}

	private renderUndefined(elem: string): Preact.VNode {
		return (
			<div class='PageEditorInner-UndefinedElement'>
				<p><strong>{elem}</strong> is undefined.</p>
			</div>
		);
	}

	private renderClickCapture(path: string, child: Preact.ComponentChild, broadcast?: boolean) {
		return (
			<button class='PageEditorInner-ClickCapture'
				onMouseOver={this.handleHover.bind(this, path)}
				onClick={this.handleClick.bind(this, path, broadcast ?? true)}>
				{child}
			</button>
		);
	}

	private renderFocusRing() {
		const buffer = 0;
		let bounds = { top: Infinity, left: Infinity, width: 0, height: 0 };

		Array.from(this.state.hovered!.elem.children).forEach((child: Element) => {
			let rect = child.getBoundingClientRect();
			if (rect.width) bounds.left = Math.min(bounds.left, rect.x + window.scrollX - buffer);
			if (rect.width) bounds.top = Math.min(bounds.top, rect.y + window.scrollY - buffer);
			bounds.width = Math.max(bounds.width, rect.width + buffer * 2);
			bounds.height = Math.max(bounds.height, rect.height + buffer * 2);
		});

		return (
			<div class='PageEditorInner-FocusRing' style={bounds} />
		);
	}

	private handleHover(path: string, evt: MouseEvent) {
		this.cancelEvent(evt);
		if (this.state.hovered?.path !== path)
			this.setState({ hovered: { path: path, elem: evt.currentTarget as HTMLElement }});
	}

	private handleClick(path: string, broadcast: boolean, evt: MouseEvent | TouchEvent) {
		this.cancelEvent(evt);
		if (broadcast) this.send('edit', path);
	}

	private handleSetProps(path: string, props: any) {
		const element = ObjectPath.traversePath(path, this.state.page.elements);
		element.props = props;

		this.send('page', this.state.page);
		this.forceUpdate();
	}

	private cancelEvent(evt: MouseEvent | TouchEvent) {
		evt.stopPropagation();
		evt.preventDefault();
	}

	private send(type: string, body?: any) {
		window.parent?.postMessage({ type: type, body: body }, window.location.origin);
	}

	private receive = (evt: MessageEvent) => {
		let type = evt.data.type as string;
		let body = evt.data.body as any;

		switch (type) {
		case 'page':
			this.setState({ page: body });
			break;

		default:
			console.log(type, body);
			break;
		}
	};
}

PageEditorInner.contextType = AppContext;
