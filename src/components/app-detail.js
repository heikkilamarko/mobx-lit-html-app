import { html, nothing } from 'lit-html';
import { addRenderReaction, addWatchReaction, clearReactions } from '../utils';
import { routeStore, browseStore } from '../stores';
import './app-detail-card';
import './app-error';

class AppDetail extends HTMLElement {
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

  get content() {
    if (browseStore.isLoading) {
      return nothing;
    }

    if (browseStore.hasError) {
      return html`<app-error .text=${browseStore.error.message}></app-error>`;
    }

    if (browseStore.selectedItem) {
      return html`
        <app-detail-card .data="${browseStore.selectedItem}"></app-detail-card>
      `;
    }

    return html`<app-error .title=${'404'} .text=${'Not Found'}></app-error>`;
  }
}

customElements.define('app-detail', AppDetail);
