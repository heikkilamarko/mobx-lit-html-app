import { action, decorate, observable, computed } from 'mobx';
import createRouter from 'router5';
import browserPlugin from 'router5-plugin-browser';

const routes = [
  { name: 'browse', path: '/' },
  { name: 'detail', path: '/items/:id' },
  { name: 'counter', path: '/counter' },
];

class RouteStore {
  constructor() {
    this.router = createRouter(routes, { allowNotFound: true });
    this.router.usePlugin(browserPlugin());
    this.unsubscribe = null;

    this.route = null;
    this.previousRoute = null;
  }

  get isNotFoundRoute() {
    return this.route?.name === '@@router5/UNKNOWN_ROUTE';
  }

  setRoute({ route, previousRoute }) {
    this.route = route;
    this.previousRoute = previousRoute;
  }

  start() {
    if (!this.router.isStarted()) {
      this.unsubscribe = this.router.subscribe(this.setRoute.bind(this));
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

decorate(RouteStore, {
  route: observable.ref,
  previousRoute: observable.ref,
  isNotFoundRoute: computed,
  setRoute: action,
});

export default new RouteStore();
