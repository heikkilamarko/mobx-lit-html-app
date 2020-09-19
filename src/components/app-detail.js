import { html } from 'lit-element';
import { reaction } from 'mobx';
import { MobxLitElement } from '../utils';
import browseStore from '../stores/browseStore';
import routeStore from '../stores/routeStore';
import './app-browse-card';
import './app-error';
import './app-detail-card';

export class AppDetail extends MobxLitElement {
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

  connectedCallback() {
    super.connectedCallback();
    this.reaction = reaction(
      () => routeStore.route,
      (route) => {
        if (route.name === 'detail') {
          browseStore.load(route.params.id);
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
