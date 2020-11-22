import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/toast';
import { html, render } from 'lit-html';
import { registerComponents } from './components';
import { registerStores } from './stores';
import { stores } from './shared/stores';
import { configureMobX } from './shared/utils';
import './index.css';

async function startup() {
  try {
    configureMobX();
    registerComponents();
    await registerStores(stores);
    renderApp();
  } catch (error) {
    renderError(error);
  }
}

function renderApp() {
  render(html`<app-root></app-root>`, document.body);
}

function renderError(error) {
  render(
    html`
      <main
        class="px-4 py-5 overflow-auto d-flex flex-column align-items-center vh-100 bg-danger text-white"
      >
        <h1 class="display-1 fw-lighter">Close, but No Cigar</h1>
        <p class="pt-2">${error}</p>
      </main>
    `,
    document.body,
  );
}

startup();
