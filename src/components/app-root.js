import { LitElement, html } from 'lit-element';
import routeStore from '../stores/routeStore';
import './app-navbar';
import './app-content';

routeStore.start();

export class AppRoot extends LitElement {
  render() {
    return html`
      <app-navbar></app-navbar>
      <app-content></app-content>
    `;
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define('app-root', AppRoot);
