import { LitElement, html } from 'lit-element';

export class AppCounterModal extends LitElement {
  handleOk(_event) {
    this.dispatchEvent(new Event('modal-ok'));
  }

  handleCancel(_event) {
    this.dispatchEvent(new Event('modal-cancel'));
  }

  render() {
    return html`
      <div id="app-counter-modal" class="modal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Counter</h5>
              <button
                type="button"
                class="close"
                aria-label="Close"
                @click=${this.handleCancel}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>Are you sure you want to reset the counter?</p>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                @click=${this.handleCancel}
              >
                Cancel
              </button>
              <button
                type="button"
                class="btn btn-primary"
                @click=${this.handleOk}
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define('app-counter-modal', AppCounterModal);
