import { html } from 'lit-html';
import { stores } from '../stores';
import { addRenderReaction, clearReactions } from '../utils';

class AppNotFound extends HTMLElement {
  connectedCallback() {
    addRenderReaction(this);
  }

  disconnectedCallback() {
    clearReactions(this);
  }

  render() {
    return html`
      <app-error
        .title=${'404'}
        .text=${stores.i18nStore.t('notfound')}
      ></app-error>
    `;
  }
}

customElements.define('app-not-found', AppNotFound);
