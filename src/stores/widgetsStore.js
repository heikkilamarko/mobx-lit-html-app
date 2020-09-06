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
