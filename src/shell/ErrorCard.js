import { html, nothing } from 'lit';
import { makeObservable, observable } from 'mobx';
import { stores } from '../shared/stores';
import { addRenderReaction, clearReactions } from '../shared/utils';
import './ErrorCard.scss';

export class ErrorCard extends HTMLElement {
	/** @type {string} */
	title;
	/** @type {string} */
	text;

	constructor() {
		super();
		makeObservable(this, {
			title: observable.ref,
			text: observable.ref
		});
	}

	connectedCallback() {
		addRenderReaction(this);
	}

	disconnectedCallback() {
		clearReactions(this);
	}

	render() {
		const { t } = stores.i18nStore;

		return html`
			<div class="card mx-auto text-center text-danger">
				<div class="card-body">
					<h1 class="card-title display-1">${this.title || t('error')}</h1>
					${this.text ? html`<p class="card-text fw-lighter">${this.text}</p>` : nothing}
				</div>
			</div>
		`;
	}
}
