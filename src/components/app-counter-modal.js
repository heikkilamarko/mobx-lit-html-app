import { html } from 'lit-html';
import { stores } from '../stores';
import { addRenderReaction, clearReactions } from '../utils';

class AppCounterModal extends HTMLElement {
  connectedCallback() {
    const { t } = stores.i18nStore;

    addRenderReaction(
      this,
      () => html`
        <div class="modal" tabindex="-1">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">${t('counter')}</h5>
                <button
                  type="button"
                  class="btn-close"
                  data-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <p>${t('counter.modal.message')}</p>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-light"
                  data-dismiss="modal"
                >
                  ${t('cancel')}
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  @click=${this.handleOk}
                >
                  ${t('ok')}
                </button>
              </div>
            </div>
          </div>
        </div>
      `,
    );
  }

  disconnectedCallback() {
    clearReactions(this);
  }

  handleOk() {
    this.dispatchEvent(new Event('ok'));
  }
}

customElements.define('app-counter-modal', AppCounterModal);
