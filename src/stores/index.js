import { getResources } from '../api';
import I18nStore from './I18nStore';
import ToastStore from './ToastStore';
import RouteStore from './RouteStore';
import BrowseStore from './BrowseStore';
import CounterStore from './CounterStore';
import JokesStore from './JokesStore';
import DatagridStore from './DatagridStore';
import FormStore from './FormStore';
import WidgetsStore from './WidgetsStore';

export const stores = {};

export async function createStores() {
  const resources = await getResources();

  const i18nStore = new I18nStore(resources);
  const toastStore = new ToastStore();
  const routeStore = new RouteStore();
  const browseStore = new BrowseStore();
  const counterStore = new CounterStore();
  const jokesStore = new JokesStore();
  const datagridStore = new DatagridStore();
  const formStore = new FormStore({ i18nStore, toastStore });
  const widgetsStore = new WidgetsStore();

  routeStore.start();

  Object.assign(stores, {
    i18nStore,
    toastStore,
    routeStore,
    browseStore,
    counterStore,
    jokesStore,
    datagridStore,
    formStore,
    widgetsStore,
  });
}
