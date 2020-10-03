import { getResources } from '../api';
import I18nStore from './I18nStore';
import RouteStore from './RouteStore';
import BrowseStore from './BrowseStore';
import CounterStore from './CounterStore';
import JokesStore from './JokesStore';
import WidgetsStore from './WidgetsStore';

export const stores = {};

export async function createStores() {
  const resources = await getResources();

  const i18nStore = new I18nStore(resources);
  const routeStore = new RouteStore();
  const browseStore = new BrowseStore();
  const counterStore = new CounterStore();
  const jokesStore = new JokesStore();
  const widgetsStore = new WidgetsStore(routeStore);

  routeStore.start();

  Object.assign(stores, {
    i18nStore,
    routeStore,
    browseStore,
    counterStore,
    jokesStore,
    widgetsStore,
  });
}
