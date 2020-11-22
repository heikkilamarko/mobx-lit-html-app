import { html, nothing } from 'lit-html';
import { stores } from '../shared/stores';
import { addRenderReaction, clearReactions } from '../shared/utils';

export class Browse extends HTMLElement {
  connectedCallback() {
    addRenderReaction(this);

    stores.browseStore.load();
  }

  disconnectedCallback() {
    clearReactions(this);
  }

  render() {
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
  }

  handleCardClick(event, item) {
    event.preventDefault();
    stores.routeStore.navigate('browse.detail', { id: item.id });
  }
}
