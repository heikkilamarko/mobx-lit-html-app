import { html, nothing } from 'lit-html';
import { routeStore, browseStore } from '../stores';
import { addRenderReaction, addWatchReaction, clearReactions } from '../utils';
import './app-detail-card';
import './app-error';

class AppDetail extends HTMLElement {
  get content() {
    if (browseStore.isLoading) {
      return nothing;
    }

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
    addWatchReaction(
      this,
      () => routeStore.route,
      (route) => {
        if (route.name === 'detail') {
          browseStore.load(route.params.id);
        }
      },
      { fireImmediately: true },
    );

    addRenderReaction(
      this,
      () => html`
        <section class="d-flex align-items-center justify-content-center p-4">
          ${this.content}
        </section>
      `,
    );
  }

  disconnectedCallback() {
    clearReactions(this);
  }
}

customElements.define('app-detail', AppDetail);
