import { Charts } from './Charts';
import moduleLocales from './locales.json';

export function registerComponents() {
	customElements.define('app-charts', Charts);
}

export async function registerLocales(locales) {
	Object.assign((locales.en ??= {}), moduleLocales.en);
	Object.assign((locales.fi ??= {}), moduleLocales.fi);
}
