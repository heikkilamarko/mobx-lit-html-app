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
  renderApp({ tagName: 'app-root' });
} catch (error) {
  console.error(error);
  alert('App startup failed.');
}
