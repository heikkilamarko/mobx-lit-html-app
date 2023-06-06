import { makeObservable, action, observable, reaction } from 'mobx';

const LOCAL_STORAGE_KEY = 'app-theme';

export class ThemeStore {
  /** @type {string} */
  theme;

  constructor() {
    makeObservable(this, {
      theme: observable.ref,
      setTheme: action.bound,
    });

    this.theme = this.#getTheme();

    reaction(
      () => this.theme,
      (theme) => this.#setTheme(theme),
      { fireImmediately: true },
    );
  }

  /**
   * @param {string} theme
   */
  setTheme(theme) {
    this.theme = theme;
  }

  /**
   * @param {string} theme
   */
  #setTheme(theme) {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem(LOCAL_STORAGE_KEY, theme);
  }

  #getTheme() {
    const storedTheme = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedTheme) return storedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }
}
