import { html, nothing } from 'lit-html';
import { stores } from '../stores';
import { addWatchReaction, addRenderReaction, clearReactions } from '../utils';
import './app-error';
import './app-widgets.css';

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
        <main class="container">
          <div class="row mx-1 my-5 justify-content-center">
            <select
              id="select-widget"
              class="form-select form-select-lg"
              aria-label="Widget select"
              .value=${stores.widgetsStore.widgetId ?? ''}
              @change="${(event) => this.handleWidgetChange(event)}"
            >
              <option value="">${t('selectWidget')}</option>
              ${this.selectOptions}
            </select>
          </div>
          ${this.widgetElement}
        </main>
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
    if (!stores.widgetsStore.widgetId) {
      return nothing;
    }

    return (
      stores.widgetsStore.widgetEl ??
      html`
        <div class="alert alert-danger" role="alert">
          The selected widget was not found in the registry.
        </div>
      `
    );
  }

  handleWidgetChange(event) {
    stores.widgetsStore.navigate(+event.target.value);
  }
}

customElements.define('app-widgets', AppWidgets);
