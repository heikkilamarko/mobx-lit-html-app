import { html, nothing } from 'lit-html';
import { stores } from '../stores';
import { addWatchReaction, addRenderReaction, clearReactions } from '../utils';
import './app-error';
import './app-widgets.scss';

class AppWidgets extends HTMLElement {
  connectedCallback() {
    const { t } = stores.i18nStore;

    stores.widgetsStore.load();

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

    addRenderReaction(this, () => {
      if (stores.widgetsStore.isLoading) {
        return nothing;
      }

      if (stores.widgetsStore.hasError) {
        return html`
          <app-error .text=${stores.widgetsStore.error.message}></app-error>
        `;
      }

      return html`
        <select
          class="form-select form-select-lg mx-auto mt-3 mb-5 app-widgets__select"
          aria-label="Widget select"
          .value=${stores.widgetsStore.widgetId ?? ''}
          @change="${(event) => this.handleWidgetChange(event)}"
        >
          <option value="">${t('widgets.select.placeholder')}</option>
          ${this.selectOptions}
        </select>
        ${this.widgetElement}
      `;
    });
  }

  disconnectedCallback() {
    clearReactions(this);
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
        <app-error
          .title=${t('error')}
          .text=${t('widgets.error.notfound')}
        ></app-error>
      `
    );
  }

  handleWidgetChange(event) {
    stores.widgetsStore.navigate(+event.target.value);
  }
}

customElements.define('app-widgets', AppWidgets);
