import Cookie from 'js-cookie';
import * as Preact from 'preact';
import { useState, useEffect, useContext } from 'preact/hooks';

import { AppContext } from './AppContext';
import { SiteData, SiteDataSpecifier } from '../../common/interface/SiteData';

/**
 * Returns a function that forces a component to rerender.
 * Can be used to manually reload a component if it becomes desync'd from the state.
 * Warning: If you're considering using this function, there's probably larger issues here, AURI.
 *
 * @returns a function that can be called to rerender the component.
 */

export function useForceUpdate() {
	// @ts-ignore
	const [ value, setValue ] = useState<boolean>(false);
	return () => setValue(value => !value);
};


/**
 * Forces an immediate rerender of a component as soon as it mounts.
 * Can be used to ensure that a component is rerendered after a ref is attached.
 */

export function useImmediateRerender() {
	const forceUpdate = useForceUpdate();
	useEffect(() => forceUpdate(), []);
};


/**
 * Calls onCancel if a click event is triggered on an element that is not a child of the currently ref'd popup.
 * Optionally, a condition function can be supplied, and the cancel test will only occur if the function returns true.
 * Any dependents for the condition function can be supplied in the dependents array,
 * this hook will automatically handle depending on the current popup, cancel function, and condition function.
 *
 * @param {Preact.RefObject<any>} popup - The popup ref to watch.
 * @param {Function} onCancel - The function to call if a click occurs outside of `popup`.
 * @param {Function} condition - An optional function to determine whether or not to run the click test.
 * @param {any[]} dependents - An array of dependents for the condition function.
 */

export function usePopupCancel(popup: Preact.RefObject<any>, onCancel: () => any, condition?: () => boolean, dependents?: any[]) {
	const body = document.getElementsByTagName('body')[0];

	useEffect(() => {
		if (!popup.current || (condition && !condition())) return;

		const handleTestCancel = (e: MouseEvent | TouchEvent) => {
			let x = e.target as HTMLElement;
			while (x) {
				if (x === popup.current) return;
				x = x.parentNode as HTMLElement;
			}

			onCancel();
		};

		body.addEventListener('mouseup', handleTestCancel);
		body.addEventListener('touchend', handleTestCancel);

		return () => {
			body.removeEventListener('mouseup', handleTestCancel);
			body.removeEventListener('touchend', handleTestCancel);
		};
	}, [ popup.current, onCancel, condition, ...dependents || [] ]);
}


/**
 * Provides access to the AppContext through a hook.
 * Returns three values, the first being the data currently stored in the context,
 * the second being a method to refresh data based on site data specifiers,
 * and the third being a method to manually merge some data grabbed from another source,
 * such as a server route that returns site data.
 *
 * Additionally, parameters may be provided to this hook to automatically refresh site data.
 * If a site data specifier or array of specifiers are passed into the hook, said data will be queried internally
 * by an internal effect whenever the dependents change. If no dependents are specified, the query will only run
 * on the initial mount. This diverges from the useEffect pattern because the hook depends on the context and the
 * effect updates the context, so having no dependents would result in an infinite loop.
 *
 * @param {SiteDataSpecifier | SiteDataSpecifier[]} refresh - An optional set of specifiers to refresh inside of an effect.
 * @param {any[]} dependents - An optional set of dependents to watch if the previous parameter is set.
 * @returns a reference to the context data, a method to refresh the context data, and a method to merge the context data, in a tuple.
 */

export function useSiteData(refresh?: SiteDataSpecifier | SiteDataSpecifier[], dependents?: any[]):
[ Partial<SiteData>, (refresh: SiteDataSpecifier | SiteDataSpecifier []) => Promise<Partial<SiteData>>,
	(data: Partial<SiteData>) => void ] {
	const ctx = useContext(AppContext);

	const refreshSiteData = async (refresh: SiteDataSpecifier | SiteDataSpecifier[]) => {
		try {
			const refreshArray = Array.isArray(refresh) ? refresh : [ refresh ];
			const res = await fetch('/admin/data/' + refreshArray.join('&'), { cache: 'no-cache' });
			if (res.status !== 200) throw 'Invalid credentials.';
			const json = await res.json();
			ctx.mergeData(json);
		}
		catch {
			Cookie.remove('tkn');
			location.href = '/admin';
			return undefined as any;
		}
	};

	useEffect(() => {
		if (refresh) refreshSiteData(refresh);
	}, dependents ?? []);

	return [ ctx.data, refreshSiteData, ctx.mergeData ];
}
