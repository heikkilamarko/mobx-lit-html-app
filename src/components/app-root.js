import { LitElement, html } from 'lit-element';
import './app-navbar';
import './app-content';

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
