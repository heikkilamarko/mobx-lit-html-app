import { getResources } from '../api';
import I18nStore from './I18nStore';
import RouteStore from './routeStore';
import BrowseStore from './browseStore';
import CounterStore from './counterStore';
import WidgetsStore from './widgetsStore';

export const stores = {};

export async function createStores() {
  const resources = await getResources();
  const locale = Object.keys(resources)[0];

  const i18nStore = new I18nStore(locale, resources);
  const routeStore = new RouteStore();
  const browseStore = new BrowseStore();
  const counterStore = new CounterStore();
  const widgetsStore = new WidgetsStore(routeStore);

  routeStore.start();

  Object.assign(stores, {
    i18nStore,
    routeStore,
    browseStore,
    counterStore,
    widgetsStore,
  });
}
