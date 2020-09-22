import { html } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';
import { addRenderReaction, clearReactions } from '../utils';
import { routeStore, widgetsStore } from '../stores';

class AppNavbar extends HTMLElement {
  connectedCallback() {
    addRenderReaction(this, () => {
      const route = routeStore.route.name;
      return html`
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
          <div class="container-fluid">
            <a
              class="navbar-brand"
              @click="${(event) => this.navigateHome(event)}"
              href="/"
            >
              LitElement App
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
              <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                  <a
                    class="${classMap({
                      'nav-link': true,
                      active: route === 'browse' || route === 'detail',
                    })}"
                    @click="${(event) => this.navigateHome(event)}"
                    href="/"
                    >Browse</a
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
                    >Counter</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    class="${classMap({
                      'nav-link': true,
                      active: route === 'widgets',
                    })}"
                    @click="${(event) => this.navigateWidgets(event)}"
                    href="${widgetsStore.widgetRoute}"
                    >Widgets</a
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

  navigateHome(event) {
    event.preventDefault();
    routeStore.navigate('browse');
  }

  navigateCounter(event) {
    event.preventDefault();
    routeStore.navigate('counter');
  }

  navigateWidgets(event) {
    event.preventDefault();
    widgetsStore.navigate();
  }
}

customElements.define('app-navbar', AppNavbar);
