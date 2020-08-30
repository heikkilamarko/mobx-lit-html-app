import { LitElement, html } from 'lit-element';
import axios from 'axios';
import routeStore from '../stores/routeStore';
import './app-browse-card';
import './app-error';
import './app-detail-card';

export class AppDetail extends LitElement {
  static get properties() {
    return {
      id: { type: Number },
      item: { type: Array },
      error: { type: Object },
      notFound: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.id = null;
    this.item = null;
    this.error = null;
    this.notFound = false;
  }

  async load() {
    try {
      this.item = null;
      this.error = null;
      this.notFound = false;

      const { data } = await axios.get('/data.json');

      this.item = data.find((i) => i.id === this.id);

      if (!this.item) {
        this.notFound = true;
      }
    } catch (error) {
      this.error = error;
    }
  }

  async firstUpdated() {
    this.id = routeStore.route.params.id;
    await this.load();
  }

  render() {
    return html`
      <section class="d-flex align-items-center justify-content-center p-4">
        ${this.error
          ? html`<app-error text="${this.error.message}"></app-error>`
          : null}
        ${this.notFound
          ? html`<app-error text="Not Found" title="404"></app-error>`
          : null}
        ${this.item
          ? html`<app-detail-card .data="${this.item}"></app-detail-card>`
          : null}
      </section>
    `;
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define('app-detail', AppDetail);
