import { html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { stores } from '../shared/stores';
import { addRenderReaction, clearReactions, preventDefault } from '../shared/utils';

export class Navbar extends HTMLElement {
	connectedCallback() {
		addRenderReaction(this);
	}

	disconnectedCallback() {
		clearReactions(this);
	}

	render() {
		const {
			routeStore: { navigate, route: _ }
		} = stores;

		return html`
			<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
				<div class="container-fluid">
					<a
						class="navbar-brand"
						@click="${preventDefault(() => navigate('browse'))}"
						href="/browse"
					>
						<img
							src="/android-chrome-192x192.png"
							alt="App brand image (rocket)"
							width="24"
							height="24"
							class="d-inline-block align-text-bottom me-2"
						/>
						<span>Demo App</span>
					</a>
					<button
						class="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarNav"
						aria-controls="navbarNav"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span class="navbar-toggler-icon"></span>
					</button>
					<div class="collapse navbar-collapse" id="navbarNav">
						<ul class="navbar-nav">
							${navItems()}
						</ul>
						<div class="d-flex text-white py-2 mx-auto">
							<app-clock></app-clock>
						</div>
						<ul class="navbar-nav">
							<li class="nav-item dropdown">
								<app-theme-picker></app-theme-picker>
							</li>
							<li class="nav-item dropdown">
								<app-locale-picker></app-locale-picker>
							</li>
							<li class="nav-item">
								<a
									class="nav-link"
									target="_blank"
									rel="noreferrer"
									href=${stores.configStore.config.gitHubUrl}
									>GitHub</a
								>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		`;
	}
}

function navItems() {
	const {
		routeStore: { routes, isActive, buildPath, navigate },
		i18nStore: { t }
	} = stores;

	return routes
		.filter(({ navbar }) => navbar)
		.map(({ name }) => {
			const params = routeParams(name);
			return navItem({
				title: t(name),
				active: isActive(name),
				href: buildPath(name, params),
				handleClick: () => navigate(name, params)
			});
		});
}

function navItem({ title, active, href, handleClick }) {
	return html`
		<li class="nav-item">
			<a
				class=${classMap({ 'nav-link': true, active })}
				href=${href}
				@click=${preventDefault(handleClick)}
				>${title}</a
			>
		</li>
	`;
}

function routeParams(name) {
	const id = stores.widgetsStore.widgetId ?? undefined;
	return name === 'widgets' ? { id } : undefined;
}
