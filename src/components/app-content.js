import { html } from 'lit-element';
import { MobxLitElement } from '../utils';
import { routeStore } from '../stores';
import './app-browse';
import './app-detail';
import './app-counter';
import './app-widgets';
import './app-error';

class AppContent extends MobxLitElement {
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
        return html`<app-error title="404" text="Not Found" />`;
    }
  }

  render() {
    return html`<main class="container">${this.content}</main>`;
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define('app-content', AppContent);
