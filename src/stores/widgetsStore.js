import { nothing } from 'lit-html';
import { action, computed, decorate, observable } from 'mobx';
import axios from 'axios';
import { createElement } from '../utils';

class WidgetsStore {
  constructor() {
    this.widgets = [];
    this.selectedWidgetId = null;
    this.error = null;
  }

  get selectedWidget() {
    const widget =
      this.widgets.find((widget) => widget.id === this.selectedWidgetId) ||
      null;
    return widget ? createElement(widget) : nothing;
  }

  get hasError() {
    return !!this.error;
  }

  setWidgets(widgets) {
    this.widgets = widgets;
  }

  setSelectedWidgetId(widgetId) {
    this.selectedWidgetId = widgetId;
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
  selectedWidgetId: observable.ref,
  error: observable.ref,
  selectedWidget: computed,
  hasError: computed,
  setWidgets: action,
  setSelectedWidgetId: action,
  setError: action,
  load: action,
});

export default new WidgetsStore();
