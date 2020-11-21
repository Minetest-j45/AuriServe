import * as Preact from 'preact';
import { useAsyncMemo } from 'use-async-memo';

import PageEditorRenderer from '../../editor/PageEditorRenderer';

import loadPlugins from '../../../LoadPlugins';

export default function PageEditorRendererPage() {
	const elements = useAsyncMemo(() => loadPlugins(true), []);
	if (!elements) return;
	
	return (
		<PageEditorRenderer defs={elements} />
	);
}
