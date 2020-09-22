import { html, render } from 'lit-html';
import './app-navbar';
import './app-content';

export default class AppRoot extends HTMLElement {
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
