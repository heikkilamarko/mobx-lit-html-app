import { html } from 'lit-element';
import { MobxLitElement } from '../utils';
import browseStore from '../stores/browseStore';
import routeStore from '../stores/routeStore';
import './app-browse-card';
import './app-error';
import './app-detail-card';

export class AppDetail extends MobxLitElement {
  firstUpdated() {
    browseStore.load(routeStore.route.params.id);
  }

  get content() {
    if (browseStore.hasError) {
      return html`<app-error text="${browseStore.error.message}"></app-error>`;
    }

    if (browseStore.selectedItem) {
      return html`
        <app-detail-card .data="${browseStore.selectedItem}"></app-detail-card>
      `;
    }

    return html`<app-error text="Not Found" title="404"></app-error>`;
  }

  render() {
    return html`
      <section class="d-flex align-items-center justify-content-center p-4">
        ${this.content}
      </section>
    `;
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define('app-detail', AppDetail);
