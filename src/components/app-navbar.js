import { html } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';
import { stores } from '../stores';
import { addRenderReaction, clearReactions } from '../utils';
import './app-locale-nav-item';
import './app-clock';

const GITHUB_URL = import.meta.env.SNOWPACK_PUBLIC_GITHUB_URL;

class AppNavbar extends HTMLElement {
  connectedCallback() {
    addRenderReaction(this, () => {
      const { t } = stores.i18nStore;
      const route = stores.routeStore.route.name;

      return html`
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
          <div class="container-fluid">
            <a
              class="navbar-brand"
              @click="${(event) => this.navigate(event, 'browse')}"
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
                <li class="nav-item">
                  <a
                    class="${classMap({
                      'nav-link': true,
                      active: route === 'browse' || route === 'detail',
                    })}"
                    @click="${(event) => this.navigate(event, 'browse')}"
                    href="/"
                    >${t('browse')}</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    class="${classMap({
                      'nav-link': true,
                      active: route === 'counter',
                    })}"
                    @click="${(event) => this.navigate(event, 'counter')}"
                    href="/counter"
                    >${t('counter')}</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    class="${classMap({
                      'nav-link': true,
                      active: route === 'jokes',
                    })}"
                    @click="${(event) => this.navigate(event, 'jokes')}"
                    href="/jokes"
                    >${t('jokes')}</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    class="${classMap({
                      'nav-link': true,
                      active: route === 'datagrid',
                    })}"
                    @click="${(event) => this.navigate(event, 'datagrid')}"
                    href="/datagrid"
                    >${t('datagrid')}</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    class="${classMap({
                      'nav-link': true,
                      active: route === 'widgets',
                    })}"
                    @click="${(event) => this.navigate(event, 'widgets')}"
                    href="${stores.widgetsStore.widgetRoute}"
                    >${t('widgets')}</a
                  >
                </li>
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

  navigate(event, routeName) {
    event.preventDefault();
    routeName === 'widgets'
      ? stores.widgetsStore.navigate()
      : stores.routeStore.navigate(routeName);
  }
}

customElements.define('app-navbar', AppNavbar);
