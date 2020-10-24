import { html } from 'lit-html';
import { stores } from '../stores';
import { addRenderReaction, clearReactions } from '../utils';

class AppToast extends HTMLElement {
  connectedCallback() {
    addRenderReaction(this, () => {
      const { toast = {} } = stores.toastStore;

      return html`
        <div
          class="toast position-fixed text-white bg-${toast.type} border-0"
          style="bottom:1rem;right:1rem"
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
              style="flex:1 0 auto"
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
