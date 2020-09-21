import { LitElement, html } from 'lit-element';
import './app-browse-card.css';

class AppBrowseCard extends LitElement {
  static get properties() {
    return {
      data: { type: Object },
    };
  }

  render() {
    return html`
      <a
        class="card text-center app-browse-card"
        href="/browse/${this.data.id}"
      >
        <div class="card-body">
          <h4 class="card-title">${this.data.name}</h4>
          <img
            src="${this.data.logo_url}"
            width="100"
            height="100"
            alt="logo"
          />
        </div>
      </a>
    `;
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define('app-browse-card', AppBrowseCard);
