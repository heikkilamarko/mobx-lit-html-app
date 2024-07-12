import { html } from 'lit';
import { stores } from '../shared/stores';
import { addRenderReaction, clearReactions } from '../shared/utils';

export class Content extends HTMLElement {
	connectedCallback() {
		addRenderReaction(this);
	}

	disconnectedCallback() {
		clearReactions(this);
	}

	render() {
		return html`
			<main class="container p-3">
				${stores.routeStore.routeTemplate ?? html`<app-not-found></app-not-found>`}
			</main>
		`;
	}
}
