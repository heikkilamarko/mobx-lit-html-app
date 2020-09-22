import { html, nothing } from 'lit-html';
import { addWatchReaction, addRenderReaction, clearReactions } from '../utils';
import { routeStore, widgetsStore } from '../stores';
import './app-error';
import './app-widgets.css';

class AppWidgets extends HTMLElement {
  connectedCallback() {
    widgetsStore.load();

    addWatchReaction(
      this,
      () => routeStore.route,
      (route) => {
        if (route.name === 'widgets') {
          widgetsStore.setWidgetId(route.params.id);
        }
      },
      { fireImmediately: true },
    );

    addRenderReaction(this, () => {
      if (widgetsStore.isLoading) {
        return nothing;
      }

      if (widgetsStore.hasError) {
        return html`
          <app-error .text=${widgetsStore.error.message}></app-error>
        `;
      }

      return html`
        <main class="container">
          <div class="row mx-1 my-5 justify-content-center">
            <select
              id="select-widget"
              class="form-select form-select-lg"
              aria-label="Widget select"
              .value=${widgetsStore.widgetId ?? ''}
              @change="${(event) => this.handleWidgetChange(event)}"
            >
              <option value="">Select widget...</option>
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
    const id = widgetsStore.widgetId;
    return widgetsStore.widgets.map(
      (w) =>
        html`
          <option .value=${w.id} ?selected=${w.id === id}>${w.name}</option>
        `,
    );
  }

  get widgetElement() {
    if (!widgetsStore.widgetId) {
      return nothing;
    }

    return (
      widgetsStore.widgetEl ??
      html`
        <div class="alert alert-danger" role="alert">
          The selected widget was not found in the registry.
        </div>
      `
    );
  }

  handleWidgetChange(event) {
    widgetsStore.navigate(+event.target.value);
  }
}

customElements.define('app-widgets', AppWidgets);
