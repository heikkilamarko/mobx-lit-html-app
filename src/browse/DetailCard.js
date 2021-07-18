import { html } from 'lit';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import ArrowLeftIcon from 'bootstrap-icons/icons/arrow-left.svg?raw';
import BoxArrowUpRightIcon from 'bootstrap-icons/icons/box-arrow-up-right.svg?raw';
import { makeObservable, observable } from 'mobx';
import { stores } from '../shared/stores';
import { addRenderReaction, clearReactions } from '../shared/utils';
import './DetailCard.scss';

export class DetailCard extends HTMLElement {
  /** @type {import("./types").BrowseItem} */
  data;

  constructor() {
    super();
    makeObservable(this, {
      data: observable.ref,
    });
  }

  connectedCallback() {
    addRenderReaction(this);
  }

  disconnectedCallback() {
    clearReactions(this);
  }

  render() {
    const { t } = stores.i18nStore;

    return html`
      <div class="card mx-auto">
        <img src="${this.data.logo_url}" class="card-img-top" alt="logo" />
        <div class="card-body">
          <h4 class="card-title">${this.data.name}</h4>
          <p class="card-text">${this.data.description}</p>
          <a
            href="${this.data.homepage_url}"
            target="_blank"
            rel="noreferrer"
            class="btn btn-primary rounded-pill"
          >
            ${t('browse.detail.homepage')} ${unsafeSVG(BoxArrowUpRightIcon)}
          </a>
          <button
            aria-label=${t('browse.detail.back')}
            type="button"
            class="btn btn-outline-primary float-end rounded-pill"
            @click=${stores.routeStore.navigateBack}
          >
            ${unsafeSVG(ArrowLeftIcon)}
          </button>
        </div>
      </div>
    `;
  }
}
