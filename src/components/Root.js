import { html, render } from 'lit-html';
import './Root.css';

export class Root extends HTMLElement {
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
