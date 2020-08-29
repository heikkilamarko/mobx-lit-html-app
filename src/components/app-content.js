import { LitElement, html } from 'lit-element';
import './app-content.css';
import './app-browse';
import './app-detail';
import routeStore, { actions } from '../stores/routeStore';

export class AppContent extends LitElement {
  handleStoreUpdate = () => this.requestUpdate();

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener(actions.UPDATED, this.handleStoreUpdate);
  }

  disconnectedCallback() {
    window.removeEventListener(actions.UPDATED, this.handleStoreUpdate);
    super.disconnectedCallback();
  }

  render() {
    const r = routeStore.getRoute();

    return html`
      <main class="container">
        ${r.name === 'browse' ? html`<app-browse></app-browse>` : null}
        ${r.name === 'detail' ? html`<app-detail></app-detail>` : null}
      </main>
    `;
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define('app-content', AppContent);
