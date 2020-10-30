import { html } from 'lit-html';
import { makeObservable, observable } from 'mobx';
import { stores } from '../stores';
import { addRenderReaction, clearReactions } from '../utils';
import { arrowLeft, boxArrowUpRight } from './icons';
import './app-detail-card.css';

class AppDetailCard extends HTMLElement {
  data;

  constructor() {
    super();
    makeObservable(this, {
      data: observable.ref,
    });
  }

  connectedCallback() {
    const { t } = stores.i18nStore;

    addRenderReaction(
      this,
      () => html`
        <div class="card mx-auto app-detail-card">
          <img src="${this.data.logo_url}" class="card-img-top" alt="logo" />
          <div class="card-body">
            <h4 class="card-title">${this.data.name}</h4>
            <p class="card-text">${this.data.description}</p>
            <a
              href="${this.data.homepage_url}"
              target="_blank"
              rel="noreferrer"
              class="btn btn-primary"
            >
              ${t('browse.detail.homepage')}
              ${boxArrowUpRight('align-text-top ml-1')}
            </a>
            <button
              aria-label=${t('browse.detail.back')}
              type="button"
              class="btn btn-outline-primary float-right"
              @click=${stores.routeStore.navigateBack}
            >
              ${arrowLeft('align-text-bottom')}
            </button>
          </div>
        </div>
      `,
    );
  }

  disconnectedCallback() {
    clearReactions(this);
  }
}

customElements.define('app-detail-card', AppDetailCard);
