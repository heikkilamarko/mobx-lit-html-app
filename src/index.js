import { configure } from 'mobx';
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
