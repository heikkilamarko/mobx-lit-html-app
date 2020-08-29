import { LitElement, html } from 'lit-element';
import axios from 'axios';
import './app-browse-card';
import './app-error';

export class AppBrowse extends LitElement {
  static get properties() {
    return {
      items: { type: Array },
      error: { type: Object },
    };
  }

  constructor() {
    super();
    this.items = [];
    this.error = null;
  }

  async load() {
    try {
      const { data } = await axios.get('/data.json');
      this.items = data;
    } catch (error) {
      this.error = error;
    }
  }

  async firstUpdated() {
    await this.load();
  }

  render() {
    return html`
      ${!this.error && this.items
        ? html`
            <div class="row p-2">
              ${this.items.map(
                (item) =>
                  html`<app-browse-card
                    class="col-6 col-md-4 col-lg-3 p-2"
                    .data="${item}"
                  />`,
              )}
            </div>
          `
        : null}
      ${this.error
        ? html`<app-error text="${this.error.message}"></app-error>`
        : null}
    `;
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define('app-browse', AppBrowse);
