import { html } from 'lit-element';
import { nothing } from 'lit-html';
import { reaction } from 'mobx';
import { MobxLitElement } from '../utils';
import { routeStore, widgetsStore } from '../stores';
import './app-error';
import './app-widgets.css';

export class AppWidgets extends MobxLitElement {
  firstUpdated() {
    widgetsStore.load();
  }

  connectedCallback() {
    super.connectedCallback();
    this.reaction = reaction(
      () => routeStore.route,
      (route) => {
        if (route.name === 'widgets') {
          widgetsStore.setWidgetId(route.params.id);
        }
      },
      { fireImmediately: true },
    );
  }

  disconnectedCallback() {
    this.reaction?.();
    super.disconnectedCallback();
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

  render() {
    if (widgetsStore.isLoading) {
      return nothing;
    }

    if (widgetsStore.hasError) {
      return html`<app-error text="${widgetsStore.error.message}"></app-error>`;
    }

    return html`
      <main class="container">
        <div class="row mx-1 my-5 justify-content-center">
          <select
            id="select-widget"
            class="form-select form-select-lg"
            aria-label="Widget select"
            .value=${widgetsStore.widgetId ?? ''}
            @change="${this.handleWidgetChange}"
          >
            <option value="">Select widget...</option>
            ${this.selectOptions}
          </select>
        </div>
        ${this.widgetElement}
      </main>
    `;
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define('app-widgets', AppWidgets);
