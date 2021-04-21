import { html, nothing } from 'lit';
import { stores } from '../shared/stores';
import {
  addWatchReaction,
  addRenderReaction,
  clearReactions,
} from '../shared/utils';
import './Widgets.scss';

export class Widgets extends HTMLElement {
  connectedCallback() {
    addWatchReaction(
      this,
      () => stores.routeStore.route,
      (route) => {
        if (route.name === 'widgets') {
          stores.widgetsStore.setWidgetId(route.params.id);
        }
      },
      { fireImmediately: true },
    );

    addRenderReaction(this);

    stores.widgetsStore.load();
  }

  disconnectedCallback() {
    clearReactions(this);
  }

  render() {
    const { t } = stores.i18nStore;

    if (stores.widgetsStore.isLoading) {
      return nothing;
    }

    if (stores.widgetsStore.hasError) {
      return html`
        <app-error-card
          .text=${stores.widgetsStore.error.message}
        ></app-error-card>
      `;
    }

    return html`
      <select
        class="form-select form-select-lg mx-auto mt-3 mb-5 app-widgets-select"
        aria-label="Widget select"
        .value=${stores.widgetsStore.widgetId ?? ''}
        @change="${(event) => this.handleWidgetChange(event)}"
      >
        <option value="">${t('widgets.select.placeholder')}</option>
        ${this.selectOptions}
      </select>
      ${this.widgetElement}
    `;
  }

  get selectOptions() {
    const id = stores.widgetsStore.widgetId;
    return stores.widgetsStore.widgets.map(
      (w) =>
        html`
          <option .value=${w.id} ?selected=${w.id === id}>${w.name}</option>
        `,
    );
  }

  get widgetElement() {
    const {
      i18nStore: { t },
      widgetsStore: { widgetId, widgetEl },
    } = stores;

    if (!widgetId) {
      return nothing;
    }

    return (
      widgetEl ??
      html`
        <app-error-card
          .title=${t('error')}
          .text=${t('widgets.error.notfound')}
        ></app-error-card>
      `
    );
  }

  handleWidgetChange(event) {
    const id = stores.widgetsStore.parseWidgetId(event.target.value);
    stores.routeStore.navigate('widgets', id ? { id } : undefined);
  }
}
