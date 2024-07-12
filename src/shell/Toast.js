import { html } from 'lit';
import { stores } from '../shared/stores';
import { addRenderReaction, clearReactions } from '../shared/utils';
import './Toast.scss';

export class Toast extends HTMLElement {
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
				class="toast hide position-fixed bottom-0 end-0 border-0 m-3"
				role="alert"
				aria-live="assertive"
				aria-atomic="true"
				data-bs-delay=${toast.delay}
			>
				<div class="toast-header text-white bg-${toast.type}">
					<strong class="me-auto">${toast.title}</strong>
					<button
						type="button"
						class="btn-close btn-close-white"
						data-bs-dismiss="toast"
						aria-label=${t('close')}
					></button>
				</div>
				<div class="toast-body">${toast.body}</div>
			</div>
		`;
	}
}
