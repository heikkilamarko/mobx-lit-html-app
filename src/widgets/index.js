import { Widgets } from './Widgets';
import { WidgetsStore } from './WidgetsStore';
import moduleLocales from './locales.json';

export function registerComponents() {
  customElements.define('app-widgets', Widgets);
}

export async function registerStores(stores) {
  const widgetsStore = new WidgetsStore();
  Object.assign(stores, { widgetsStore });
}

export async function registerLocales(locales) {
  Object.assign((locales.en ??= {}), moduleLocales.en);
  Object.assign((locales.fi ??= {}), moduleLocales.fi);
}
