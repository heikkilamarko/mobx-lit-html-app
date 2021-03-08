import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/toast';
import { configure } from 'mobx';
import { html, render } from 'lit-html';
import { locales } from './shared/locales';
import { stores } from './shared/stores';
import * as shell from './shell';
import * as browse from './browse';
import * as counter from './counter';
import * as jokes from './jokes';
import * as datagrid from './datagrid';
import * as charts from './charts';
import * as form from './form';
import * as widgets from './widgets';
import './index.scss';

const modules = [
  shell,
  browse,
  counter,
  jokes,
  datagrid,
  charts,
  form,
  widgets,
];

async function startup() {
  try {
    configureMobX();
    await registerLocales();
    await registerStores();
    registerComponents();
    renderApp();
  } catch (error) {
    renderError(error);
  }
}

startup();

function configureMobX() {
  configure({
    enforceActions: 'never',
    observableRequiresReaction: false,
    computedRequiresReaction: true,
    reactionRequiresObservable: true,
    isolateGlobalState: true,
  });
}

async function registerLocales() {
  for (const m of modules) {
    await m.registerLocales?.(locales);
  }
}

async function registerStores() {
  for (const m of modules) {
    await m.registerStores?.(stores);
  }
}

function registerComponents() {
  for (const m of modules) {
    m.registerComponents?.();
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
