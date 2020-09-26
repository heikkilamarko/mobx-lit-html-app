import { makeObservable, action, observable, computed, reaction } from 'mobx';

const LOCAL_STORAGE_KEY = 'app-locale';

export default class I18nStore {
  resources = {};
  locale;

  constructor(resources, locale) {
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

    reaction(
      () => this.locale,
      (l) => {
        localStorage.setItem(LOCAL_STORAGE_KEY, l);
      },
    );
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
    if (!this.locales?.length) {
      throw new Error('Locales are not loaded yet.');
    }

    locale ??= localStorage.getItem(LOCAL_STORAGE_KEY) || this.locales[0];

    if (!this.locales.includes(locale)) {
      throw new Error(`Locale '${locale}' is not supported.`);
    }

    this.locale = locale;
  }

  t = (key, values) => {
    let template = this.localeResources[key];

    if (template == null) {
      return key;
    }

    if (!values) {
      return template;
    }

    for (const key in values) {
      template = template.replace(`{${key}}`, values[key]);
    }

    return template;
  };
}
