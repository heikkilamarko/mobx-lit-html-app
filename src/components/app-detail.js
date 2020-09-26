import { html, nothing } from 'lit-html';
import { stores } from '../stores';
import { addRenderReaction, addWatchReaction, clearReactions } from '../utils';
import './app-detail-card';
import './app-error';

class AppDetail extends HTMLElement {
  connectedCallback() {
    addWatchReaction(
      this,
      () => stores.routeStore.route,
      (route) => {
        if (route.name === 'detail') {
          stores.browseStore.load(route.params.id);
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
    if (stores.browseStore.isLoading) {
      return nothing;
    }

    if (stores.browseStore.hasError) {
      return html`
        <app-error .text=${stores.browseStore.error.message}></app-error>
      `;
    }

    if (stores.browseStore.selectedItem) {
      return html`
        <app-detail-card
          .data="${stores.browseStore.selectedItem}"
        ></app-detail-card>
      `;
    }

    return html`
      <app-error
        .title=${'404'}
        .text=${stores.i18nStore.t('notfound')}
      ></app-error>
    `;
  }
}

customElements.define('app-detail', AppDetail);
