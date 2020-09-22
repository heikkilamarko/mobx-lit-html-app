import { html, nothing } from 'lit-html';
import { addRenderReaction, clearReactions } from '../utils';
import { routeStore, browseStore } from '../stores';
import './app-browse-card';
import './app-error';

class AppBrowse extends HTMLElement {
  connectedCallback() {
    browseStore.load();

    addRenderReaction(this, () => {
      if (browseStore.isLoading) {
        return nothing;
      }

      if (browseStore.hasError) {
        return html`
          <app-error .text=${browseStore.error.message}></app-error>
        `;
      }

      return html`
        <div class="row p-2">
          ${browseStore.items.map(
            (item) => html`
              <app-browse-card
                class="col-6 col-md-4 col-lg-3 p-2"
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
    routeStore.navigate('detail', { id: item.id });
  }
}

customElements.define('app-browse', AppBrowse);
