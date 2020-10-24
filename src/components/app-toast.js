import { html } from 'lit-html';
import { stores } from '../stores';
import { addRenderReaction, clearReactions } from '../utils';
import './app-toast.css';

class AppToast extends HTMLElement {
  connectedCallback() {
    addRenderReaction(this, () => {
      const { toast = {} } = stores.toastStore;

      return html`
        <div
          class="toast position-fixed bottom-0 right-0 border-0 m-3 px-2 py-1 text-white bg-${toast.type}"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          data-delay=${toast.delay}
        >
          <div class="d-flex align-items-center">
            <div class="toast-body">${toast.message}</div>
            <button
              type="button"
              class="btn-close btn-close-white ml-auto mr-2"
              data-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
        </div>
      `;
    });
  }

  disconnectedCallback() {
    clearReactions(this);
  }
}

customElements.define('app-toast', AppToast);
