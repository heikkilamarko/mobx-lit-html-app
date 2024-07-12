import { Counter } from './Counter';
import { CounterModal } from './CounterModal';
import { CounterStore } from './CounterStore';
import moduleLocales from './locales.json';

export function registerComponents() {
	customElements.define('app-counter', Counter);
	customElements.define('app-counter-modal', CounterModal);
}

export async function registerStores(stores) {
	const counterStore = new CounterStore();
	Object.assign(stores, { counterStore });
}

export async function registerLocales(locales) {
	Object.assign((locales.en ??= {}), moduleLocales.en);
	Object.assign((locales.fi ??= {}), moduleLocales.fi);
}
