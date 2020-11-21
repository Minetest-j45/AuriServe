import * as Preact from 'preact';
import { useAsyncMemo } from 'use-async-memo';
import { useState, useEffect, useMemo } from 'preact/hooks';

import PageEditorControl from '../../editor/PageEditorControl';

import loadPlugins from '../../../LoadPlugins';

import * as Page from '../../../../../common/interface/Page';

async function getPageData(page: string): Promise<Page.Page> {
	try {
		const r = await fetch('/admin/pages/data/', {
			method: 'POST',
			cache: 'no-cache',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({ page: page })
		});
		if (r.status !== 200) throw 'Invalid credentials.';
		return await r.json();
	}
	catch (e) {
		location.href = '/admin';
		return {} as Page.Page;
	}
};

function handleSave(path: string, page: Page.Page) {
	fetch('/admin/pages/update', {
		method: 'POST', cache: 'no-cache',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({ path: path, body: page })
	}).then(() => window.location.href = '/admin/pages');
}

export default function PageEditorControlPage() {
	const [ page, setPage ] = useState<Page.Page | undefined>(undefined);
	const path = useMemo<string>(() => window.location.pathname.replace(/^\/admin\/pages\//g, ''), [ window.location.pathname ]);
	useEffect(() => { getPageData(path).then((page) => setPage(page)); }, [ path ]);

	const elements = useAsyncMemo(() => loadPlugins(), []);
	if (!page || !path || !elements) return;

	return (
		<PageEditorControl
			path={path}
			page={page}

			defs={elements}

			onSave={(page) => handleSave(path, page)}
		/>
	);
}
