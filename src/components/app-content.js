import { html } from 'lit-html';
import { addRenderReaction, clearReactions } from '../utils';
import { routeStore } from '../stores';
import './app-browse';
import './app-detail';
import './app-counter';
import './app-widgets';
import './app-error';

class AppContent extends HTMLElement {
  connectedCallback() {
    addRenderReaction(
      this,
      () => html`<main class="container">${this.content}</main>`,
    );
  }

  disconnectedCallback() {
    clearReactions(this);
  }

  get content() {
    switch (routeStore.route.name) {
      case 'browse':
        return html`<app-browse></app-browse>`;
      case 'detail':
        return html`<app-detail></app-detail>`;
      case 'counter':
        return html`<app-counter></app-counter>`;
      case 'widgets':
        return html`<app-widgets></app-widgets>`;
      default:
        return html`<app-error .title=${'404'} .text=${'Not Found'} />`;
    }
  }
}

customElements.define('app-content', AppContent);
