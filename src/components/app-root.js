import { html, render } from 'lit-html';
import './app-navbar';
import './app-content';
import './app-root.scss';

class AppRoot extends HTMLElement {
  connectedCallback() {
    render(
      html`
        <app-navbar></app-navbar>
        <app-content></app-content>
      `,
      this,
    );
  }
}

customElements.define('app-root', AppRoot);
