import { makeObservable, action, observable, computed, reaction } from 'mobx';
import createRouter, { constants } from 'router5';
import browserPlugin from 'router5-plugin-browser';
import { analyticsPageview } from '../utils';

const routes = [
  { name: 'browse', path: '/' },
  { name: 'detail', path: '/browse/:id' },
  { name: 'counter', path: '/counter' },
  { name: 'jokes', path: '/jokes' },
  { name: 'datagrid', path: '/datagrid' },
  { name: 'charts', path: '/charts' },
  { name: 'widgets', path: '/widgets' },
];

export default class RouteStore {
  route = null;
  previousRoute = null;
  router = null;
  unsubscribe = null;

  constructor() {
    makeObservable(this, {
      route: observable.ref,
      previousRoute: observable.ref,
      isNotFoundRoute: computed,
      setRoute: action.bound,
    });

    this.router = createRouter(routes, {
      allowNotFound: true,
      queryParamsMode: 'loose',
    });
    this.router.usePlugin(browserPlugin());

    reaction(
      () => this.route,
      (route) => analyticsPageview(route.path),
    );
  }

  get isNotFoundRoute() {
    return this.route?.name === constants.UNKNOWN_ROUTE;
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

  navigate(routeName, routeParams, options, done) {
    this.router.navigate(routeName, routeParams, options, done);
  }

  navigateBack() {
    history.back();
  }
}
