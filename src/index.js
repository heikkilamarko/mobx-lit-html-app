import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/toast';
import { configure } from 'mobx';
import { html, render } from 'lit-html';
import { stores } from './shared/stores';
import * as shell from './shell';
import * as browse from './browse';
import * as counter from './counter';
import * as jokes from './jokes';
import * as datagrid from './datagrid';
import * as charts from './charts';
import * as form from './form';
import * as widgets from './widgets';
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

function configureMobX() {
  configure({
    enforceActions: 'never',
    observableRequiresReaction: false,
    computedRequiresReaction: true,
    reactionRequiresObservable: true,
    isolateGlobalState: true,
  });
}

function registerComponents() {
  shell.registerComponents();
  browse.registerComponents();
  counter.registerComponents();
  jokes.registerComponents();
  datagrid.registerComponents();
  charts.registerComponents();
  form.registerComponents();
  widgets.registerComponents();
}

async function registerStores() {
  await shell.registerStores(stores);
  await browse.registerStores(stores);
  await counter.registerStores(stores);
  await jokes.registerStores(stores);
  await datagrid.registerStores(stores);
  await charts.registerStores(stores);
  await form.registerStores(stores);
  await widgets.registerStores(stores);
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
