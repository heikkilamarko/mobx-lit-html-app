import { html } from 'lit-html';
import { stores } from '../stores';
import { addRenderReaction, clearReactions } from '../utils';
import './app-toast.css';

class AppToast extends HTMLElement {
  connectedCallback() {
    addRenderReaction(this);
  }

  disconnectedCallback() {
    clearReactions(this);
  }

  render() {
    const { t } = stores.i18nStore;
    const { toast = {} } = stores.toastStore;

    return html`
      <div
        class="toast hide position-fixed bottom-0 right-0 border-0 m-3"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        data-delay=${toast.delay}
      >
        <div class="toast-header text-white bg-${toast.type}">
          <strong class="mr-auto">${toast.title}</strong>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-dismiss="toast"
            aria-label=${t('close')}
          ></button>
        </div>
        <div class="toast-body">${toast.body}</div>
      </div>
    `;
  }
}

customElements.define('app-toast', AppToast);
