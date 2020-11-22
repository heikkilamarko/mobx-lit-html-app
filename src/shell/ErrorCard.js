import { html, nothing } from 'lit-html';
import { makeObservable, observable } from 'mobx';
import { stores } from '../shared/stores';
import { addRenderReaction, clearReactions } from '../shared/utils';
import './ErrorCard.css';

export class ErrorCard extends HTMLElement {
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
    addRenderReaction(this);
  }

  disconnectedCallback() {
    clearReactions(this);
  }

  render() {
    const { t } = stores.i18nStore;

    return html`
      <div class="card mx-auto text-center text-danger app-error-card">
        <div class="card-body">
          <h1 class="card-title display-1">${this.title || t('error')}</h1>
          ${this.text
            ? html`<p class="card-text fw-lighter">${this.text}</p>`
            : nothing}
        </div>
      </div>
    `;
  }
}
