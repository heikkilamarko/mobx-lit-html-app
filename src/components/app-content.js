import { html } from 'lit-element';
import { MobxLitElement } from '@adobe/lit-mobx';
import './app-content.css';
import './app-browse';
import './app-detail';
import './app-counter';
import routeStore from '../stores/routeStore';

export class AppContent extends MobxLitElement {
  render() {
    const route = routeStore.route.name;

    return html`
      <main class="container">
        ${route === 'browse' ? html`<app-browse></app-browse>` : null}
        ${route === 'detail' ? html`<app-detail></app-detail>` : null}
        ${route === 'counter' ? html`<app-counter></app-counter>` : null}
      </main>
    `;
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define('app-content', AppContent);
