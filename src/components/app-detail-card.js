import { LitElement, html } from 'lit-element';
import routeStore from '../stores/routeStore';
import './app-detail-card.css';

export class AppDetailCard extends LitElement {
  static get properties() {
    return {
      data: { type: Object },
    };
  }

  constructor() {
    super();
    this.data = null;
  }

  render() {
    return html`
      <div class="card app-detail-card">
        <img src="${this.data.logo_url}" class="card-img-top" alt="logo" />
        <div class="card-body">
          <h4 class="card-title">${this.data.name}</h4>
          <p class="card-text">${this.data.description}</p>
          <a
            href="${this.data.homepage_url}"
            target="_blank"
            class="btn btn-primary"
          >
            Homepage
          </a>
          <button
            type="button"
            class="btn btn-light app-detail-card__btn-back"
            @click=${routeStore.navigateBack}
          >
            Back
          </button>
        </div>
      </div>
    `;
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define('app-detail-card', AppDetailCard);
