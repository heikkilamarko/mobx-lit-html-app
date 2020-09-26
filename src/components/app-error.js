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
    addRenderReaction(this, () => {
      const { t } = stores.i18nStore;

      return html`
        <section
          class="d-flex align-items-center justify-content-center p-4 app-error"
        >
          <div class="card text-center text-danger">
            <div class="card-body">
              <h5 class="card-title">${this.title || t('error')}</h5>
              ${this.text
                ? html`<p class="card-text">${this.text}</p>`
                : nothing}
            </div>
          </div>
        </section>
      `;
    });
  }

  disconnectedCallback() {
    clearReactions(this);
  }
}

customElements.define('app-error', AppError);
