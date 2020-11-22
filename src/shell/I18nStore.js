import { makeObservable, action, observable, computed, reaction } from 'mobx';

const LOCAL_STORAGE_KEY = 'app-locale';

export class I18nStore {
  resources = {};
  locale;

  constructor(resources, locale) {
    makeObservable(this, {
      resources: observable.ref,
      locale: observable.ref,
      localeResources: computed,
      locales: computed,
      localesExcludeCurrent: computed,
      setResources: action.bound,
      setLocale: action.bound,
    });
    this.setResources(resources);
    this.setLocale(locale);

    reaction(
      () => this.locale,
      (l) => localStorage.setItem(LOCAL_STORAGE_KEY, l),
      { fireImmediately: true },
    );
  }

  get localeResources() {
    return this.resources?.[this.locale] ?? {};
  }

  get locales() {
    return Object.keys(this.resources);
  }

  get localesExcludeCurrent() {
    return this.locales.filter((l) => l !== this.locale);
  }

  setResources(resources) {
    this.resources = resources ?? {};
  }

  setLocale(locale) {
    if (!this.locales?.length) {
      throw new Error('Locales are not loaded yet.');
    }

    locale ??= localStorage.getItem(LOCAL_STORAGE_KEY);

    if (!this.locales.includes(locale)) {
      locale = this.locales[0];
    }

    this.locale = locale;
  }

  t = (key, values, defaultValue) => {
    let template = this.localeResources[key];

    if (template == null) {
      return defaultValue ?? key;
    }

    if (!values) {
      return template;
    }

    for (const [key, value] of Object.entries(values)) {
      template = template.replace(`{${key}}`, value);
    }

    return template;
  };
}
