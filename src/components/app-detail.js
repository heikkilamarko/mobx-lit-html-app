import { html } from 'lit-element';
import { MobxLitElement } from '@adobe/lit-mobx';
import browseStore from '../stores/browseStore';
import routeStore from '../stores/routeStore';
import './app-browse-card';
import './app-error';
import './app-detail-card';

export class AppDetail extends MobxLitElement {
  async firstUpdated() {
    await browseStore.load(routeStore.route.params.id);
  }

  render() {
    return html`
      <section class="d-flex align-items-center justify-content-center p-4">
        ${browseStore.hasError
          ? html`<app-error text="${browseStore.error.message}"></app-error>`
          : null}
        ${!browseStore.selectedItem
          ? html`<app-error text="Not Found" title="404"></app-error>`
          : null}
        ${browseStore.selectedItem
          ? html`<app-detail-card
              .data="${browseStore.selectedItem}"
            ></app-detail-card>`
          : null}
      </section>
    `;
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define('app-detail', AppDetail);
