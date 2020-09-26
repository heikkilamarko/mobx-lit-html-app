import { html, render } from 'lit-html';
import { stores } from '../stores';

class AppCounterModal extends HTMLElement {
  connectedCallback() {
    const { t } = stores.i18nStore;

    render(
      html`
        <div class="modal" tabindex="-1">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">${t('counter')}</h5>
                <button
                  type="button"
                  class="close"
                  aria-label="Close"
                  @click=${() => this.handleCancel()}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <p>${t('counterModalMessage')}</p>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  @click=${() => this.handleCancel()}
                >
                  ${t('cancel')}
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  @click=${() => this.handleOk()}
                >
                  ${t('ok')}
                </button>
              </div>
            </div>
          </div>
        </div>
      `,
      this,
    );
  }

  handleOk() {
    this.dispatchEvent(new Event('ok'));
  }

  handleCancel() {
    this.dispatchEvent(new Event('cancel'));
  }
}

customElements.define('app-counter-modal', AppCounterModal);
