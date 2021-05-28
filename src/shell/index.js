import { Toast } from './Toast';
import { ErrorCard } from './ErrorCard';
import { NotFound } from './NotFound';
import { Root } from './Root';
import { Navbar } from './Navbar';
import { Content } from './Content';
import { Clock } from './Clock';
import { LocalePicker } from './LocalePicker';
import { ConfigStore } from './ConfigStore';
import { I18nStore } from './I18nStore';
import { ToastStore } from './ToastStore';
import { RouteStore } from './RouteStore';
import { getLocales } from '../shared/api';

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
  const configStore = new ConfigStore();
  const i18nStore = new I18nStore();
  const toastStore = new ToastStore();
  const routeStore = new RouteStore();

  routeStore.start();

  Object.assign(stores, {
    configStore,
    i18nStore,
    toastStore,
    routeStore,
  });
}

export async function registerLocales(locales) {
  const moduleLocales = await getLocales();
  Object.assign((locales.en ??= {}), moduleLocales.en);
  Object.assign((locales.fi ??= {}), moduleLocales.fi);
}
