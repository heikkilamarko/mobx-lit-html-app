import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';
import { createStores } from './stores';
import { configureMobX, renderApp, renderAppStartupError } from './utils';
import './components/app-root';
import './index.css';

async function startup() {
  try {
    configureMobX();
    await createStores();
    renderApp();
  } catch (error) {
    renderAppStartupError({ message: error });
  }
}

startup();
