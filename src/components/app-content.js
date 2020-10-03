import { html } from 'lit-html';
import { stores } from '../stores';
import { addRenderReaction, clearReactions } from '../utils';
import './app-browse';
import './app-detail';
import './app-counter';
import './app-jokes';
import './app-datagrid';
import './app-widgets';
import './app-error';

class AppContent extends HTMLElement {
  connectedCallback() {
    addRenderReaction(
      this,
      () => html`<main class="container p-3">${this.content}</main>`,
    );
  }

  disconnectedCallback() {
    clearReactions(this);
  }

  get content() {
    switch (stores.routeStore.route.name) {
      case 'browse':
        return html`<app-browse></app-browse>`;
      case 'detail':
        return html`<app-detail></app-detail>`;
      case 'counter':
        return html`<app-counter></app-counter>`;
      case 'jokes':
        return html`<app-jokes></app-jokes>`;
      case 'datagrid':
        return html`<app-datagrid></app-datagrid>`;
      case 'widgets':
        return html`<app-widgets></app-widgets>`;
      default:
        return html`
          <app-error
            .title=${'404'}
            .text=${stores.i18nStore.t('notfound')}
          ></app-error>
        `;
    }
  }
}

customElements.define('app-content', AppContent);
