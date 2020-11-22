import { Toast } from './Toast';
import { ErrorCard } from './ErrorCard';
import { NotFound } from './NotFound';
import { Root } from './Root';
import { Navbar } from './Navbar';
import { Content } from './Content';
import { Clock } from './Clock';
import { LocalePicker } from './LocalePicker';
import { I18nStore } from './I18nStore';
import { ToastStore } from './ToastStore';
import { RouteStore } from './RouteStore';
import { getResources } from '../shared/api';

export function registerComponents() {
  customElements.define('app-toast', Toast);
  customElements.define('app-error-card', ErrorCard);
  customElements.define('app-not-found', NotFound);
  customElements.define('app-root', Root);
  customElements.define('app-navbar', Navbar);
  customElements.define('app-content', Content);
  customElements.define('app-clock', Clock);
  customElements.define('app-locale-picker', LocalePicker);
}

export async function registerStores(stores) {
  const resources = await getResources();

  const i18nStore = new I18nStore(resources);
  const toastStore = new ToastStore();
  const routeStore = new RouteStore();

  routeStore.start();

  Object.assign(stores, {
    i18nStore,
    toastStore,
    routeStore,
  });
}
