import { Jokes } from './Jokes';
import { Joke } from './Joke';
import { JokesStore } from './JokesStore';
import moduleLocales from './locales.json';

export function registerComponents() {
	customElements.define('app-jokes', Jokes);
	customElements.define('app-joke', Joke);
}

export async function registerStores(stores) {
	const jokesStore = new JokesStore();
	Object.assign(stores, { jokesStore });
}

export async function registerLocales(locales) {
	Object.assign((locales.en ??= {}), moduleLocales.en);
	Object.assign((locales.fi ??= {}), moduleLocales.fi);
}
