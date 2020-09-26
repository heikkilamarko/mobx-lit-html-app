import { makeObservable, action, computed, observable } from 'mobx';
import { getWidgets } from '../api';
import { createElement } from '../utils';

export default class WidgetsStore {
  widgets = [];
  widgetId = null;
  isLoading = false;
  error = null;

  constructor(routeStore) {
    this.routeStore = routeStore;

    makeObservable(this, {
      widgets: observable.ref,
      widgetId: observable.ref,
      isLoading: observable.ref,
      error: observable.ref,
      hasWidgets: computed,
      hasError: computed,
      widgetEl: computed,
      widgetRoute: computed,
      setWidgets: action,
      setWidgetId: action,
      setLoading: action,
      setError: action,
      load: action,
      navigate: action,
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

  get widgetRoute() {
    const id = this.widgetId;
    return id != null ? `/widgets?id=${id}` : '/widgets';
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

  setLoading(isLoading) {
    this.isLoading = isLoading;
  }

  setError(error) {
    this.error = error;
  }

  async load(refresh = false) {
    if (this.hasWidgets && !refresh) return;
    try {
      this.setLoading(true);
      this.setError(null);
      const widgets = await getWidgets();
      this.setWidgets(widgets);
    } catch (error) {
      this.setError(error);
    } finally {
      this.setLoading(false);
    }
  }

  navigate(widgetId = null) {
    const id =
      widgetId == null ? this.widgetId ?? undefined : widgetId || undefined;

    this.routeStore.navigate('widgets', { id });
  }
}
