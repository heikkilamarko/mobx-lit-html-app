import { makeObservable, action, observable, computed } from 'mobx';
import UniversalRouter from 'universal-router';
import generateUrls from 'universal-router/generateUrls';
import { routes } from '../shared/routes';

export class RouteStore {
	route = null;
	router = null;
	urls = null;

	constructor() {
		this.start = this.start.bind(this);
		this.isActive = this.isActive.bind(this);
		this.navigate = this.navigate.bind(this);
		this.navigateBack = this.navigateBack.bind(this);
		this.buildPath = this.buildPath.bind(this);

		makeObservable(this, {
			route: observable.ref,
			routeName: computed,
			routeTemplate: computed,
			setRoute: action.bound
		});

		this.router = new UniversalRouter(routes);
		this.urls = generateUrls(this.router, {
			stringifyQueryParams: (params) => new URLSearchParams(params).toString()
		});
	}

	get routes() {
		return routes;
	}

	get routeName() {
		return this.route?.name;
	}

	get routeTemplate() {
		const route = this.routes.find((r) => r.name === this.routeName);
		return route ? route.template : undefined;
	}

	setRoute(route) {
		this.route = route;
	}

	start() {
		document.addEventListener('click', (e) => {
			const link = e.target.closest('a[data-link]');
			if (!link) return;
			e.preventDefault();
			const href = link.getAttribute('href');
			history.pushState(null, '', href);
			this.render(href);
		});

		window.addEventListener('popstate', () => this.render(location.href));

		this.render(location.href);
	}

	isActive(name) {
		return this.routeName === name;
	}

	navigate(routeName, routeParams) {
		const href = this.buildPath(routeName, routeParams);
		history.pushState(null, '', href);
		this.render(href);
	}

	navigateBack() {
		history.back();
	}

	buildPath(routeName, routeParams) {
		return this.urls(routeName, routeParams);
	}

	async render(href) {
		console.debug(href);
		try {
			const url = new URL(href, location.origin);
			const queryParams = Object.fromEntries(new URLSearchParams(url.search));
			const route = await this.router.resolve({ pathname: url.pathname, queryParams });
			if (route.redirect) location = route.redirect;
			this.setRoute(route);
		} catch (err) {
			console.error(err);
		}
	}
}
