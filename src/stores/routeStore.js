import produce from 'immer';
import createRouter from 'router5';
import browserPlugin from 'router5-plugin-browser';
import { noop } from '../utils';

const routes = [
  { name: 'browse', path: '/' },
  { name: 'detail', path: '/items/:id' },
];

const actions = {
  UPDATED: 'app.store.route.updated',
};

function createStore() {
  let state = { route: null, previousRoute: null };

  let router;
  let disposeFn = noop;

  function setState(fn) {
    const newState = produce(state, (d) => {
      fn(d);
    });

    if (newState !== state) {
      state = newState;
      window.dispatchEvent(new CustomEvent(actions.UPDATED));
    }
  }

  function getState() {
    return state;
  }

  function getRoute() {
    return state.route;
  }

  function getRouteName() {
    return state.route?.name;
  }

  function getRouteParams() {
    return state.route?.params;
  }

  function listen() {
    router = createRouter(routes, { allowNotFound: true });
    router.usePlugin(browserPlugin());
    disposeFn = router.subscribe(({ route, previousRoute }) =>
      setState((d) => {
        d.route = route;
        d.previousRoute = previousRoute;
      }),
    );
    router.start();
  }

  function unlisten() {
    disposeFn();
    disposeFn = noop;
  }

  function navigate(routeName, routeParams, options, done) {
    router.navigate(routeName, routeParams, options, done);
  }

  function navigateBack() {
    history.back();
  }

  return {
    getState,
    getRoute,
    getRouteName,
    getRouteParams,
    listen,
    unlisten,
    navigate,
    navigateBack,
  };
}

export { actions };

export default createStore();
