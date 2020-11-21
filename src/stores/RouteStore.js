import { makeObservable, action, observable, computed, reaction } from 'mobx';
import createRouter, { constants } from 'router5';
import browserPlugin from 'router5-plugin-browser';
import { routes } from '../routes';
import { analyticsPageview } from '../utils';

export default class RouteStore {
  route = null;
  previousRoute = null;
  router = null;
  unsubscribe = null;

  constructor() {
    makeObservable(this, {
      route: observable.ref,
      previousRoute: observable.ref,
      routeName: computed,
      routeTemplate: computed,
      isNotFoundRoute: computed,
      setRoute: action.bound,
    });

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.isActive = this.isActive.bind(this);
    this.navigate = this.navigate.bind(this);
    this.navigateBack = this.navigateBack.bind(this);
    this.buildPath = this.buildPath.bind(this);

    this.router = createRouter(routes, {
      defaultRoute: 'browse',
      allowNotFound: true,
      queryParamsMode: 'loose',
    });
    this.router.usePlugin(browserPlugin());

    reaction(
      () => this.route,
      (route) => analyticsPageview(route.path),
    );
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

  get isNotFoundRoute() {
    return this.routeName === constants.UNKNOWN_ROUTE;
  }

  setRoute({ route, previousRoute }) {
    this.route = route;
    this.previousRoute = previousRoute;
  }

  start() {
    if (!this.router.isStarted()) {
      this.unsubscribe = this.router.subscribe(this.setRoute);
      this.router.start();
    }
  }

  stop() {
    this.router.stop();
    this.unsubscribe?.();
    this.unsubscribe = null;
  }

  isActive(name, params, strictEquality, ignoreQueryParams) {
    return this.router.isActive(
      name,
      params,
      strictEquality,
      ignoreQueryParams,
    );
  }

  navigate(routeName, routeParams, options, done) {
    this.router.navigate(routeName, routeParams, options, done);
  }

  navigateBack() {
    history.back();
  }

  buildPath(routeName, routeParams) {
    return this.router.buildPath(routeName, routeParams);
  }
}
