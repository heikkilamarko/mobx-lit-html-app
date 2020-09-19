import { html } from 'lit-element';
import { nothing } from 'lit-html';
import { reaction } from 'mobx';
import { MobxLitElement } from '../utils';
import widgetsStore from '../stores/widgetsStore';
import routeStore from '../stores/routeStore';
import './app-widgets.css';

export class AppWidgets extends MobxLitElement {
  firstUpdated() {
    widgetsStore.load();
  }

  handleWidgetChange(event) {
    routeStore.navigate('widgets', { id: +event.target.value || undefined });
  }

  get widgetElement() {
    return widgetsStore.widgetId
      ? widgetsStore.widgetEl ??
          html`
            <div class="alert alert-danger" role="alert">
              The selected widget was not found in the registry.
            </div>
          `
      : nothing;
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

  render() {
    return html`
      <main class="container">
        <div class="row mx-1 my-5 justify-content-center">
          <select
            id="select-widget"
            class="form-select form-select-lg"
            aria-label="Widget select"
            .value=${widgetsStore.widgetId}
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
