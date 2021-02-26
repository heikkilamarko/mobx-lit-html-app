export interface I18nStore {
  locales: string[];
  localesExcludeCurrent: string[];

  setLocale: (locale: string) => void;

  t: (
    key: string,
    values?: { [x: string]: any },
    defaultValue?: string,
  ) => string;
}
