import { makeObservable, action, computed, observable } from 'mobx';
import { getWidgets } from '../api';
import { createElement } from '../utils';

class WidgetsStore {
  widgets = [];
  widgetId = null;
  error = null;

  constructor() {
    makeObservable(this, {
      widgets: observable.ref,
      widgetId: observable.ref,
      error: observable.ref,
      hasWidgets: computed,
      hasError: computed,
      widgetEl: computed,
      setWidgets: action,
      setWidgetId: action,
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

  get widgetEl() {
    const id = this.widgetId;
    if (!id) return null;
    const widget = this.widgets.find((w) => w.id === id);
    if (!widget) return null;
    return createElement(widget);
  }

  setWidgets(widgets) {
    this.widgets = widgets;
  }

  setWidgetId(widgetId) {
    this.widgetId =
      widgetId != null
        ? Number.isInteger(+widgetId)
          ? +widgetId
          : null
        : null;
  }

  setError(error) {
    this.error = error;
  }

  async load(refresh = false) {
    if (this.hasWidgets && !refresh) return;
    try {
      this.setError(null);
      const widgets = await getWidgets();
      this.setWidgets(widgets);
    } catch (error) {
      this.setError(error);
    }
  }
}

export default new WidgetsStore();
