import { html } from 'lit-element';
import { nothing } from 'lit-html';
import { MobxLitElement, createElement } from '../utils';
import routeStore from '../stores/routeStore';
import widgetsStore from '../stores/widgetsStore';
import './app-widgets.css';

export class AppWidgets extends MobxLitElement {
  firstUpdated() {
    widgetsStore.load();
  }

  handleWidgetChange(event) {
    routeStore.navigate('widgets', { id: +event.target.value || undefined });
  }

  get widgetId() {
    return widgetsStore.parseWidgetId(routeStore.route.params.id, '');
  }

  get widgetElement() {
    if (this.widgetId === '') return nothing;
    const widget = widgetsStore.getWidget(this.widgetId);
    if (widget) {
      const widgetEl = createElement(widget);
      if (widgetEl) return widgetEl;
    }
    return html`
      <div class="alert alert-danger" role="alert">
        The selected widget was not found in the registry.
      </div>
    `;
  }

  get selectOptions() {
    const widgetId = this.widgetId;
    return widgetsStore.widgets.map(
      ({ id, name }) =>
        html`
          <option .value=${id} ?selected=${id === widgetId}>${name}</option>
        `,
    );
  }

  render() {
    return html`
      <main class="container">
        <div class="row mx-1 my-5 justify-content-center">
          <select
            id="select-widget"
            class="form-select form-select-lg"
            aria-label="Widget select"
            .value=${this.widgetId}
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
