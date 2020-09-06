import { action, computed, decorate, observable } from 'mobx';
import axios from 'axios';

class WidgetsStore {
  constructor() {
    this.widgets = [];
    this.error = null;
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

decorate(WidgetsStore, {
  widgets: observable.ref,
  error: observable.ref,
  hasError: computed,
  setWidgets: action,
  setError: action,
  load: action,
});

export default new WidgetsStore();
