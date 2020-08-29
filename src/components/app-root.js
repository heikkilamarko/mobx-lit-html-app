import { LitElement, html } from 'lit-element';
import './app-navbar';
import './app-content';
import routeStore from '../stores/routeStore';

routeStore.listen();

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
