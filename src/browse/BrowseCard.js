import { html, render } from 'lit';
import { stores } from '../shared/stores';
import './BrowseCard.scss';

export class BrowseCard extends HTMLElement {
	/** @type {import("./types").BrowseItem} */
	data;

	connectedCallback() {
		render(
			html`
				<a
					class="card text-center text-decoration-none"
					href=${stores.routeStore.buildPath('browse.detail', {
						id: this.data.id
					})}
				>
					<div class="card-body">
						<h4 class="card-title text-nowrap text-truncate">${this.data.name}</h4>
						<img class="object-fit-contain p-2" src="${this.data.logo_url}" alt="logo" />
					</div>
				</a>
			`,
			this
		);
	}
}
