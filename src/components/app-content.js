import { html } from 'lit-element';
import { MobxLitElement } from '../utils';
import routeStore from '../stores/routeStore';
import './app-browse';
import './app-detail';
import './app-counter';
import './app-error';

export class AppContent extends MobxLitElement {
  getContent() {
    switch (routeStore.route.name) {
      case 'browse':
        return html`<app-browse></app-browse>`;
      case 'detail':
        return html`<app-detail></app-detail>`;
      case 'counter':
        return html`<app-counter></app-counter>`;
      default:
        return html`<app-error title="404" text="Not Found" />`;
    }
  }

  render() {
    return html`<main class="container">${this.getContent()}</main>`;
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define('app-content', AppContent);
