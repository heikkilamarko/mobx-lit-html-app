import { html, render } from 'lit';
import './Root.scss';

export class Root extends HTMLElement {
	connectedCallback() {
		render(
			html`
				<app-navbar></app-navbar>
				<app-content></app-content>
				<app-toast></app-toast>
			`,
			this
		);
	}
}
