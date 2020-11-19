import { html } from 'lit-html';
import { stores } from '../stores';
import { addRenderReaction, clearReactions } from '../utils';
import './app-browse';
import './app-detail';
import './app-counter';
import './app-jokes';
import './app-datagrid';
import './app-charts';
import './app-form';
import './app-widgets';
import './app-error';
import './app-not-found';

class AppContent extends HTMLElement {
  connectedCallback() {
    addRenderReaction(this);
  }

  disconnectedCallback() {
    clearReactions(this);
  }

  render() {
    return html`<main class="container p-3">${this.content}</main>`;
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
      case 'charts':
        return html`<app-charts></app-charts>`;
      case 'form':
        return html`<app-form></app-form>`;
      case 'widgets':
        return html`<app-widgets></app-widgets>`;
      default:
        return html`<app-not-found></app-not-found>`;
    }
  }
}

customElements.define('app-content', AppContent);
