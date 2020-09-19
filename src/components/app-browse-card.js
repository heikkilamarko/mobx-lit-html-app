import { LitElement, html } from 'lit-element';
import routeStore from '../stores/routeStore';
import './app-browse-card.css';

export class AppBrowseCard extends LitElement {
  static get properties() {
    return {
      data: { type: Object },
    };
  }

  handleClick(event) {
    event.preventDefault();
    routeStore.navigate('detail', { id: this.data.id });
  }

  render() {
    return html`
      <a
        class="card text-center app-browse-card"
        @click="${this.handleClick}"
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
