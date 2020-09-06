import { html } from 'lit-element';
import { MobxLitElement } from '../utils';
import widgetsStore from '../stores/widgetsStore';

export class AppWidgets extends MobxLitElement {
  firstUpdated() {
    widgetsStore.load();
  }

  handleWidgetChange(event) {
    widgetsStore.setSelectedWidgetId(+event.target.value);
  }

  get selectOptions() {
    const selectedId = widgetsStore.selectedWidgetId;
    return widgetsStore.widgets.map(
      ({ id, name, tagName }) =>
        html`
          <option value="${id}" ?selected=${id === selectedId}>
            ${`${name} (<${tagName}>)`}
          </option>
        `,
    );
  }

  render() {
    return html`
      <main class="container">
        <div class="row mx-1 my-5">
          <select
            class="form-select"
            aria-label="Widget select"
            @change="${this.handleWidgetChange}"
          >
            <option value="">Select widget...</option>
            ${this.selectOptions}
          </select>
        </div>
        ${widgetsStore.selectedWidget}
      </main>
    `;
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define('app-widgets', AppWidgets);
