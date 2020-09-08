import { makeObservable, action, computed, observable } from 'mobx';
import axios from 'axios';

class WidgetsStore {
  widgets = [];
  error = null;

  constructor() {
    makeObservable(this, {
      widgets: observable.ref,
      error: observable.ref,
      hasWidgets: computed,
      hasError: computed,
      setWidgets: action,
      setError: action,
      load: action,
    });
  }

  get hasWidgets() {
    return !!this.widgets.length;
  }

  get hasError() {
    return !!this.error;
  }

  setWidgets(widgets) {
    this.widgets = widgets;
  }

  setError(error) {
    this.error = error;
  }

  containsWidget(id) {
    return this.widgets.some((w) => w.id === id);
  }

  getWidget(id) {
    return this.widgets.find((w) => w.id === id) ?? null;
  }

  parseWidgetId(id, defaultValue = null) {
    const idn = +id;
    return id !== undefined &&
      id != null &&
      Number.isInteger(idn) &&
      this.containsWidget(idn)
      ? idn
      : defaultValue;
  }

  async load() {
    try {
      this.setError(null);
      const { data } = await axios.get('/data/widgets.json');
      this.setWidgets(data);
    } catch (error) {
      this.setError(error);
    }
  }
}

export default new WidgetsStore();
