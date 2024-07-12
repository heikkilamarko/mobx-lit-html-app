import { html } from 'lit';
import { stores } from '../shared/stores';
import { addRenderReaction, clearReactions } from '../shared/utils';

export class CounterModal extends HTMLElement {
	connectedCallback() {
		addRenderReaction(this);
	}

	disconnectedCallback() {
		clearReactions(this);
	}

	render() {
		const { t } = stores.i18nStore;

		return html`
			<div class="modal fade" tabindex="-1">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title">${t('counter')}</h5>
							<button
								type="button"
								class="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<div class="modal-body">
							<p>${t('counter.modal.message')}</p>
						</div>
						<div class="modal-footer">
							<button
								type="button"
								class="btn btn-outline-primary rounded-pill"
								data-bs-dismiss="modal"
							>
								${t('cancel')}
							</button>
							<button type="button" class="btn btn-primary rounded-pill" @click=${this.handleOk}>
								${t('ok')}
							</button>
						</div>
					</div>
				</div>
			</div>
		`;
	}

	handleOk() {
		this.dispatchEvent(new Event('ok'));
	}
}
