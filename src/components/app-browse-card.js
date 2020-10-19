import { html } from 'lit-html';
import { makeObservable, observable } from 'mobx';
import { addRenderReaction, clearReactions } from '../utils';
import './app-browse-card.scss';

class AppBrowseCard extends HTMLElement {
  data;

  constructor() {
    super();
    makeObservable(this, {
      data: observable.ref,
    });
  }

  connectedCallback() {
    addRenderReaction(
      this,
      () => html`
        <a
          class="card text-center app-browse-card"
          href="/browse/${this.data.id}"
        >
          <div class="card-body">
            <h4 class="card-title text-truncate">${this.data.name}</h4>
            <img src="${this.data.logo_url}" alt="logo" />
          </div>
        </a>
      `,
    );
  }

  disconnectedCallback() {
    clearReactions(this);
  }
}

customElements.define('app-browse-card', AppBrowseCard);
