import { configure } from 'mobx';
import { renderApp } from './utils';
import { createStores } from './stores';
import './components/app-root';
import './index.css';

configure({
  enforceActions: 'never',
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: true,
  isolateGlobalState: true,
});

async function startup() {
  try {
    await createStores();
    renderApp({ tagName: 'app-root', props: {} });
  } catch (error) {
    console.error(error);
    document.body.innerHTML =
      '<h1 class="d-flex justify-content-center align-items-center vh-100 bg-danger text-white display-1 font-weight-lighter">Close, but No Cigar</h1>';
  }
}

startup();
