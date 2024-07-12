import { html } from 'lit';
import { stores } from '../shared/stores';
import { addRenderReaction, clearReactions } from '../shared/utils';

export class NotFound extends HTMLElement {
	connectedCallback() {
		addRenderReaction(this);
	}

	disconnectedCallback() {
		clearReactions(this);
	}

	render() {
		return html`
			<app-error-card .title=${'404'} .text=${stores.i18nStore.t('notfound')}></app-error-card>
		`;
	}
}
