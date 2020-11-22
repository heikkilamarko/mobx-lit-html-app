import { html, nothing } from 'lit-html';
import { stores } from '../shared/stores';
import {
  addRenderReaction,
  addWatchReaction,
  clearReactions,
} from '../shared/utils';

export class Detail extends HTMLElement {
  connectedCallback() {
    addWatchReaction(
      this,
      () => stores.routeStore.route,
      (route) => {
        if (route.name === 'browse.detail') {
          stores.browseStore.load(route.params.id);
        }
      },
      { fireImmediately: true },
    );

    addRenderReaction(this);
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

    if (stores.browseStore.selectedItem) {
      return html`
        <app-detail-card
          .data="${stores.browseStore.selectedItem}"
        ></app-detail-card>
      `;
    }

    return html`<app-not-found></app-not-found>`;
  }
}
