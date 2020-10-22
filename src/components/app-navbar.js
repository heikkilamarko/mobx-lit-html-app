import { html } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';
import { stores } from '../stores';
import { addRenderReaction, clearReactions, preventDefault } from '../utils';
import './app-locale-nav-item';
import './app-clock';

const GITHUB_URL = import.meta.env.SNOWPACK_PUBLIC_GITHUB_URL;

const NAV_ITEMS = [
  {
    titleKey: 'browse',
    activeRouteNames: ['browse', 'detail'],
    hrefFn: () => '/browse',
    clickFn: () => stores.routeStore.navigate('browse'),
  },
  {
    titleKey: 'counter',
    activeRouteNames: ['counter'],
    hrefFn: () => '/counter',
    clickFn: () => stores.routeStore.navigate('counter'),
  },
  {
    titleKey: 'jokes',
    activeRouteNames: ['jokes'],
    hrefFn: () => '/jokes',
    clickFn: () => stores.routeStore.navigate('jokes'),
  },
  {
    titleKey: 'datagrid',
    activeRouteNames: ['datagrid'],
    hrefFn: () => '/datagrid',
    clickFn: () => stores.routeStore.navigate('datagrid'),
  },
  {
    titleKey: 'charts',
    activeRouteNames: ['charts'],
    hrefFn: () => '/charts',
    clickFn: () => stores.routeStore.navigate('charts'),
  },
  {
    titleKey: 'widgets',
    activeRouteNames: ['widgets'],
    hrefFn: () =>
      stores.routeStore.buildPath('widgets', {
        id: stores.widgetsStore.widgetId ?? undefined,
      }),
    clickFn: () =>
      stores.routeStore.navigate('widgets', {
        id: stores.widgetsStore.widgetId ?? undefined,
      }),
  },
];

function navItem({ titleKey, activeRouteNames, hrefFn, clickFn }) {
  const { t } = stores.i18nStore;
  const route = stores.routeStore.route.name;

  return html`
    <li class="nav-item">
      <a
        class="${classMap({
          'nav-link': true,
          active: activeRouteNames.includes(route),
        })}"
        @click=${preventDefault(clickFn)}
        href=${hrefFn()}
        >${t(titleKey)}</a
      >
    </li>
  `;
}

class AppNavbar extends HTMLElement {
  connectedCallback() {
    addRenderReaction(this, () => {
      return html`
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
          <div class="container-fluid">
            <a
              class="navbar-brand"
              @click="${preventDefault(() =>
                stores.routeStore.navigate('browse'),
              )}"
              href="/"
            >
              <img
                src="/android-chrome-192x192.png"
                alt="App brand image (rocket)"
                width="24"
                height="24"
                class="d-inline-block align-text-bottom mr-2"
              />
              Demo App
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                ${NAV_ITEMS.map(navItem)}
              </ul>
              <div class="d-flex text-white py-2 mx-auto">
                <app-clock></app-clock>
              </div>
              <ul class="navbar-nav">
                <li is="app-locale-nav-item" class="nav-item dropdown"></li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    target="_blank"
                    rel="noreferrer"
                    href=${GITHUB_URL}
                    >GitHub</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </nav>
      `;
    });
  }

  disconnectedCallback() {
    clearReactions(this);
  }
}

customElements.define('app-navbar', AppNavbar);
