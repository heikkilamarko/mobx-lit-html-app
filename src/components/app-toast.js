import { html } from 'lit-html';
import { stores } from '../stores';
import { addRenderReaction, clearReactions } from '../utils';

class AppToast extends HTMLElement {
  connectedCallback() {
    addRenderReaction(this, () => {
      const { toast = {} } = stores.toastStore;

      return html`
        <div
          class="toast position-fixed d-flex align-items-center text-white bg-${toast.type} border-0"
          style="bottom:1rem;right:1rem"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          data-delay=${toast.delay}
        >
          <div class="toast-body">${toast.message}</div>
          <button
            type="button"
            class="btn-close btn-close-white ml-auto mr-2"
            data-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
      `;
    });
  }

  disconnectedCallback() {
    clearReactions(this);
  }
}

customElements.define('app-toast', AppToast);
