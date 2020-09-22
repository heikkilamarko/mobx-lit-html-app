import { configure } from 'mobx';
import { renderApp } from './utils';
import { routeStore } from './stores';
import './components/app-root';
import './index.css';

configure({
  enforceActions: 'observed',
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: true,
  isolateGlobalState: true,
});

routeStore.start();

try {
  renderApp({ tagName: 'app-root', props: {} });
} catch (error) {
  console.error(error);
  document.body.innerHTML =
    '<h1 class="d-flex justify-content-center align-items-center vh-100 bg-danger text-white display-1 font-weight-lighter">Close, but No Cigar</h1>';
}
