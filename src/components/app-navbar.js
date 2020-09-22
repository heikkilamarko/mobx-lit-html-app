import { html, nothing } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';
import { addRenderReaction, clearReactions } from '../utils';
import { routeStore, widgetsStore } from '../stores';

class AppNavbar extends HTMLElement {
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

  connectedCallback() {
    addRenderReaction(this, () => {
      const route = routeStore.route.name;
      return html`
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
          <div class="container-fluid">
            <a class="navbar-brand" @click="${this.navigateHome}" href="/">
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
                    @click="${this.navigateHome}"
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
                    @click="${this.navigateCounter}"
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
                    @click="${this.navigateWidgets}"
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
}

customElements.define('app-navbar', AppNavbar);
