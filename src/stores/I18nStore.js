import { makeObservable, action, observable, computed } from 'mobx';

export default class I18nStore {
  resources = {};
  locale;

  constructor(locale, resources) {
    makeObservable(this, {
      resources: observable.ref,
      locale: observable.ref,
      localeResources: computed,
      locales: computed,
      setResources: action,
      setLocale: action,
    });
    this.setResources(resources);
    this.setLocale(locale);
  }

  get localeResources() {
    return this.resources?.[this.locale] ?? {};
  }

  get locales() {
    return Object.keys(this.resources);
  }

  setResources(resources) {
    this.resources = resources ?? {};
  }

  setLocale(locale) {
    if (!this.locales.includes(locale)) {
      throw new Error(`Locale '${locale}' is not supported.`);
    }
    this.locale = locale;
  }

  t = (key) => this.localeResources?.[key] ?? key;
}
