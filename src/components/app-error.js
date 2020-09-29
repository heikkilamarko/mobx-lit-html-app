import { html, nothing } from 'lit-html';
import { makeObservable, observable } from 'mobx';
import { stores } from '../stores';
import { addRenderReaction, clearReactions } from '../utils';
import './app-error.css';

class AppError extends HTMLElement {
  title;
  text;

  constructor() {
    super();
    makeObservable(this, {
      title: observable.ref,
      text: observable.ref,
    });
  }

  connectedCallback() {
    const { t } = stores.i18nStore;

    addRenderReaction(this, () => {
      return html`
        <div class="card mx-auto text-center text-danger app-error">
          <div class="card-body">
            <h1 class="card-title display-1">${this.title || t('error')}</h1>
            ${this.text
              ? html`<p class="card-text font-weight-lighter">${this.text}</p>`
              : nothing}
          </div>
        </div>
      `;
    });
  }

  disconnectedCallback() {
    clearReactions(this);
  }
}

customElements.define('app-error', AppError);
