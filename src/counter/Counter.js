import { html, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import DashCircleIcon from 'bootstrap-icons/icons/dash-circle.svg?raw';
import PlusCircleIcon from 'bootstrap-icons/icons/plus-circle.svg?raw';
import XCircleIcon from 'bootstrap-icons/icons/x-circle.svg?raw';
import Modal from 'bootstrap/js/dist/modal';
import { stores } from '../shared/stores';
import { addRenderReaction, clearReactions } from '../shared/utils';

import './Counter.scss';

export class Counter extends HTMLElement {
	connectedCallback() {
		addRenderReaction(this);
	}

	disconnectedCallback() {
		clearReactions(this);

		if (this.modal) {
			this.modal.dispose();
			this.modal = undefined;
		}
	}

	render() {
		const { t } = stores.i18nStore;
		const { value, progress, minValue, maxValue } = stores.counterStore;

		return html`
			<div class="card mx-auto">
				<div class="card-body">
					<h1
						class=${classMap({
							'card-title': true,
							'display-1': true,
							'text-danger': value < 0,
							'text-primary': value === 0,
							'text-success': 0 < value
						})}
					>
						${value}
						${value === minValue
							? html`<span class="text-muted display-6">min</span>`
							: value === maxValue
								? html`<span class="text-muted display-6">max</span>`
								: nothing}
					</h1>
					<div class="progress mb-5" style="height:4px">
						<div
							class=${classMap({
								'progress-bar': true,
								'bg-danger': value < 0,
								'bg-success': 0 < value
							})}
							role="progressbar"
							style="width: ${progress}%"
							aria-label=${t('counter')}
							aria-valuenow=${value}
							aria-valuemin=${minValue}
							aria-valuemax=${maxValue}
						></div>
					</div>
					<button
						aria-label=${t('counter.decrement')}
						class="btn btn-link text-danger p-0 me-4"
						?disabled=${value === minValue}
						@click="${this.handleDecrement}"
					>
						<span class="app-btn-icon">${unsafeSVG(DashCircleIcon)}</span>
					</button>
					<button
						aria-label=${t('counter.increment')}
						class="btn btn-link text-success p-0"
						?disabled=${value === maxValue}
						@click="${this.handleIncrement}"
					>
						<span class="app-btn-icon">${unsafeSVG(PlusCircleIcon)}</span>
					</button>
					<button
						aria-label=${t('counter.reset')}
						class="btn btn-link float-end p-0"
						?disabled=${value === 0}
						@click=${this.handleReset}
					>
						<span class="app-btn-icon">${unsafeSVG(XCircleIcon)}</span>
					</button>
				</div>
			</div>
			<app-counter-modal @ok=${this.handleResetOk}></app-counter-modal>
		`;
	}

	handleDecrement() {
		stores.counterStore.decrement();
	}

	handleIncrement() {
		stores.counterStore.increment();
	}

	handleReset() {
		const modalEl = this.querySelector('app-counter-modal > .modal');
		this.modal = Modal.getOrCreateInstance(modalEl);
		modalEl.addEventListener(
			'hide.bs.modal',
			() => {
				if (document.activeElement instanceof HTMLElement) {
					document.activeElement.blur();
				}
			},
			{ once: true }
		);
		this.modal.show();
	}

	handleResetOk() {
		this.modal?.hide();
		stores.counterStore.reset();

		const { t } = stores.i18nStore;

		stores.toastStore.show({
			title: t('counter'),
			body: t('counter.toast.message')
		});
	}
}
