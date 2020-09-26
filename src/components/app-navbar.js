import { html } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';
import { addRenderReaction, clearReactions } from '../utils';
import { stores } from '../stores';
import './app-locale-nav-link';
import './app-clock';

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
              @click="${(event) => this.navigateHome(event)}"
              href="/"
            >
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
                    @click="${(event) => this.navigateHome(event)}"
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
                    @click="${(event) => this.navigateCounter(event)}"
                    href="/counter"
                    >${t('counter')}</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    class="${classMap({
                      'nav-link': true,
                      active: route === 'widgets',
                    })}"
                    @click="${(event) => this.navigateWidgets(event)}"
                    href="${stores.widgetsStore.widgetRoute}"
                    >${t('widgets')}</a
                  >
                </li>
              </ul>
              <div class="d-flex text-white py-2 mx-auto">
                <app-clock></app-clock>
              </div>
              <ul class="navbar-nav">
                <li is="app-locale-nav-link" class="nav-item dropdown"></li>
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

  navigateHome(event) {
    event.preventDefault();
    stores.routeStore.navigate('browse');
  }

  navigateCounter(event) {
    event.preventDefault();
    stores.routeStore.navigate('counter');
  }

  navigateWidgets(event) {
    event.preventDefault();
    stores.widgetsStore.navigate();
  }
}

customElements.define('app-navbar', AppNavbar);
