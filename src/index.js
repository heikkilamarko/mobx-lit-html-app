import { configure } from 'mobx';
import routeStore from './stores/routeStore';
import './components/app-root';
import './index.css';

configure({
  enforceActions: 'observed',
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: false,
  isolateGlobalState: true,
});

routeStore.start();
