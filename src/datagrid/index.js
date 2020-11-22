import { Datagrid } from './Datagrid.js';
import { DatagridStore } from './DatagridStore';

export function registerComponents() {
  customElements.define('app-datagrid', Datagrid);
}

export async function registerStores(stores) {
  const datagridStore = new DatagridStore();
  Object.assign(stores, { datagridStore });
}
