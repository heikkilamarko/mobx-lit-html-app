import { Widgets } from './Widgets';
import { WidgetsStore } from './WidgetsStore';

export function registerComponents() {
  customElements.define('app-widgets', Widgets);
}

export async function registerStores(stores) {
  const widgetsStore = new WidgetsStore();
  Object.assign(stores, { widgetsStore });
}
