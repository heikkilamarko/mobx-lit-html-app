import { Datagrid } from './Datagrid.js';
import { DatagridStore } from './DatagridStore';
import moduleLocales from './locales.json';

export function registerComponents() {
  customElements.define('app-datagrid', Datagrid);
}

export async function registerStores(stores) {
  const datagridStore = new DatagridStore();
  Object.assign(stores, { datagridStore });
}

export async function registerLocales(locales) {
  Object.assign((locales.en ??= {}), moduleLocales.en);
  Object.assign((locales.fi ??= {}), moduleLocales.fi);
}
