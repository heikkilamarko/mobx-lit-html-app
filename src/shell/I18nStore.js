import { makeObservable, action, observable, computed, reaction } from 'mobx';
import { locales } from '../shared/locales';

const LOCAL_STORAGE_KEY = 'app-locale';

export class I18nStore {
  locale;

  constructor(locale) {
    this.t = this.t.bind(this);

    makeObservable(this, {
      locale: observable.ref,
      localesExcludeCurrent: computed,
      setLocale: action.bound,
    });

    this.setLocale(locale);

    reaction(
      () => this.locale,
      (l) => localStorage.setItem(LOCAL_STORAGE_KEY, l),
      { fireImmediately: true },
    );
  }

  get locales() {
    return Object.keys(locales);
  }

  get localesExcludeCurrent() {
    return this.locales.filter((locale) => locale !== this.locale);
  }

  setLocale(locale) {
    locale ??= localStorage.getItem(LOCAL_STORAGE_KEY);

    if (!this.locales.includes(locale)) {
      locale = this.locales[0];
    }

    this.locale = locale;
  }

  t(key, values, defaultValue) {
    let template = locales[this.locale]?.[key];

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
  }
}
