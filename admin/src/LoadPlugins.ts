import { AdminDefinition } from '../../common/interface/Element';

declare global { interface Window { serve?: any } };

export type PluginElements = { [key: string]: AdminDefinition | undefined };

export default async function loadPlugins(loadStyles?: boolean) {
	const { pluginScripts, pluginStyles }: { pluginScripts: string[]; pluginStyles: string[] } =
		JSON.parse((document.getElementById('plugins') as any).innerText);

	let pluginElements: PluginElements = {};

	window.serve = {
		registerElement: (elem: AdminDefinition) => pluginElements[elem.identifier] = elem
	};

	await Promise.all(pluginScripts.map((s: string) => {
		return new Promise<void>((resolve) => {
			const script = document.createElement('script');
			
			script.async = true;
			script.src = '/plugin/' + s;
			script.addEventListener('load', () => resolve());

			document.head.appendChild(script);
		});
	}));

	if (loadStyles) {
		const { themes: siteThemes }: { themes: string[] } =
			JSON.parse((document.getElementById('themes') as any).innerText);

		await Promise.all(pluginStyles.map((s: string) => {
			return new Promise<void>((resolve) => {
				const style = document.createElement('link');

				style.rel = 'stylesheet';
				style.href = '/plugin/' + s;
				style.addEventListener('load', () => resolve());

				document.head.appendChild(style);
			});
		}));

		await Promise.all(siteThemes.map((s: string) => {
			return new Promise<void>((resolve) => {
				const style = document.createElement('link');

				style.rel = 'stylesheet';
				style.href = '/theme/' + s + '.css';
				style.addEventListener('load', () => resolve());

				document.head.appendChild(style);
			});
		}));
	}

	return pluginElements;
}
