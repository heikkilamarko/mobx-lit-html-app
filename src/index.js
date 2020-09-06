import { configure } from 'mobx';
import routeStore from './stores/routeStore';
import './components/app-root';

configure({
  enforceActions: 'observed',
  isolateGlobalState: true,
});

routeStore.start();
