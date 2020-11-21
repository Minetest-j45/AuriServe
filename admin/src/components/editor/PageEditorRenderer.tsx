import * as Preact from 'preact';
import { Helmet } from 'react-helmet';
import { useMessaging } from '../../Hooks';
import { useState, useEffect } from 'preact/hooks';

import './PageEditorRenderer.sass';

import { PluginElements } from '../../LoadPlugins';
import * as Page from '../../../../common/interface/Page';
import * as ObjectPath from '../../../../common/util/ObjectPath';

interface Props {
	defs: PluginElements;
}

export default function PageEditorRenderer(props: Props) {
	const [ page, setPage ] = useState<Page.Page | undefined>(undefined);
	const [ hovered, setHovered ] = useState<{ path: string; elem: HTMLElement } | undefined>(undefined);

	const send = useMessaging(window.parent, (type: string, body: any) => {
		switch (type) {
		case 'page':
			setPage(body);
			break;

		default:
			console.error(`Unknown data recieved, type '${type}', body:`, body);
			break;
		}
	}, [], 'editor');

	useEffect(() => send!('req-page'), []);

	const handleHover = (path: string, evt: MouseEvent) => {
		evt.stopPropagation();
		evt.preventDefault();

		if (hovered?.path !== path) setHovered({ path: path, elem: evt.currentTarget as HTMLElement });
	};

	const handleClick = (path: string, broadcast: boolean, evt: MouseEvent | TouchEvent) => {
		evt.stopPropagation();
		evt.preventDefault();

		if (broadcast) send!('edit', path);
	};

	const handleSetProps = (path: string, props: any) => {
		const element = ObjectPath.traversePath(path, page!.elements);
		element.props = props;
		send!('page', page);
	};

	const renderUndefined = (elem: string): Preact.VNode => {
		return (
			<div class='PageEditorRenderer-UndefinedElement'>
				<p><strong>{elem}</strong> is undefined.</p>
			</div>
		);
	};

	const renderClickCapture = (path: string, child: Preact.ComponentChild, broadcast: boolean = true) => {
		return (
			<button class='PageEditorRenderer-ClickCapture'
				onMouseOver={(e) => handleHover(path, e)}
				onClick={(e) => handleClick(path, broadcast, e)}>
				{child}
			</button>
		);
	};

	const renderTree = (root: Page.Child, path: string): Preact.VNode | undefined => {
		if (Page.isInclude(root)) root = root.elem as Page.Element;
		const element = props.defs[root.elem];
		if (!element?.element) return renderUndefined(root.elem);

		const InlineEditor = element.editing?.inlineEditor;
		const PropertyEditor = element.editing?.propertyEditor;

		if (InlineEditor) {
			return renderClickCapture(path, <InlineEditor {...root.props} setProps={(props: any) => handleSetProps(path, props)}>
				{root.children?.map((child, key) => renderTree(child, ObjectPath.combinePath(path, 'children', key)))}
			</InlineEditor>, PropertyEditor !== false);
		}

		const Element = element.element;
		return renderClickCapture(path, <Element {...root.props}>
			{root.children?.map((child, key) => renderTree(child, ObjectPath.combinePath(path, 'children', key)))}
		</Element>);
	};

	return (
		<Preact.Fragment>
			<Helmet>
				{/* {this.context.data.themes?.map((t: any) => <link rel='stylesheet' href={`/theme/${t.identifier}.css`} />)}*/}
			</Helmet>

			<header>{page?.elements?.header && renderTree(page.elements.header, 'header')}</header>
			<main>{page?.elements?.main && renderTree(page.elements.main, 'main')}</main>
			<footer>{page?.elements?.footer && renderTree(page.elements.footer, 'footer')}</footer>

			{/* {this.state.hovered?.elem && this.renderFocusRing()}*/}
		</Preact.Fragment>
	);
}
