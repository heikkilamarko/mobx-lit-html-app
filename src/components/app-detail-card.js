import { LitElement, html } from 'lit-element';
import { arrowLeft, boxArrowUpRight } from './icons';
import { routeStore } from '../stores';
import './app-detail-card.css';

export class AppDetailCard extends LitElement {
  static get properties() {
    return {
      data: { type: Object },
    };
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
            class="btn btn-primary app-detail-card__btn-homepage"
          >
            Homepage ${boxArrowUpRight}
          </a>
          <button
            type="button"
            class="btn btn-light app-detail-card__btn-back"
            @click=${routeStore.navigateBack}
          >
            ${arrowLeft}
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
