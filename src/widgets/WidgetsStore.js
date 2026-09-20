import { makeObservable, actionBound, computed, observableRef } from 'mobx';
import { getWidgets } from '../shared/api';
import { createElement } from '../shared/utils';

export class WidgetsStore {
	widgets = [];
	widgetId = null;
	isLoading = false;
	error = null;

	constructor() {
		makeObservable(this, {
			widgets: observableRef,
			widgetId: observableRef,
			isLoading: observableRef,
			error: observableRef,
			hasWidgets: computed,
			hasError: computed,
			widgetEl: computed,
			setWidgets: actionBound,
			setWidgetId: actionBound,
			setLoading: actionBound,
			setError: actionBound,
			load: actionBound
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
		this.widgetId = this.parseWidgetId(widgetId);
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
			this.setError(null);
			this.setLoading(true);
			const widgets = await getWidgets();
			this.setLoading(false);
			this.setWidgets(widgets);
		} catch (error) {
			this.setError(error);
		} finally {
			this.setLoading(false);
		}
	}

	parseWidgetId(value) {
		return value != null ? (Number.isInteger(+value) ? +value : null) : null;
	}
}
