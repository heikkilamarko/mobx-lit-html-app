import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/toast';
import { registerComponents } from './components';
import { registerStores } from './stores';
import { stores } from './shared/stores';
import {
  configureMobX,
  renderApp,
  renderAppStartupError,
} from './shared/utils';
import './index.css';

async function startup() {
  try {
    configureMobX();
    registerComponents();
    await registerStores(stores);
    renderApp();
  } catch (error) {
    renderAppStartupError({ message: error });
  }
}

startup();
