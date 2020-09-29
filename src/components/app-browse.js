import { html, nothing } from 'lit-html';
import { stores } from '../stores';
import { addRenderReaction, clearReactions } from '../utils';
import './app-browse-card';
import './app-error';

class AppBrowse extends HTMLElement {
  connectedCallback() {
    stores.browseStore.load();

    addRenderReaction(this, () => {
      if (stores.browseStore.isLoading) {
        return nothing;
      }

      if (stores.browseStore.hasError) {
        return html`
          <app-error .text=${stores.browseStore.error.message}></app-error>
        `;
      }

      return html`
        <div class="row g-3">
          ${stores.browseStore.items.map(
            (item) => html`
              <app-browse-card
                class="col-6 col-md-4 col-lg-3"
                .data="${item}"
                @click="${(event) => this.handleCardClick(event, item)}"
              ></app-browse-card>
            `,
          )}
        </div>
      `;
    });
  }

  disconnectedCallback() {
    clearReactions(this);
  }

  handleCardClick(event, item) {
    event.preventDefault();
    stores.routeStore.navigate('detail', { id: item.id });
  }
}

customElements.define('app-browse', AppBrowse);
