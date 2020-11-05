import { html, render } from 'lit-html';
import './app-navbar';
import './app-content';
import './app-toast';
import './app-root.scss';

class AppRoot extends HTMLElement {
  connectedCallback() {
    render(
      html`
        <app-navbar></app-navbar>
        <app-content></app-content>
        <app-toast></app-toast>
      `,
      this,
    );
  }
}

customElements.define('app-root', AppRoot);
