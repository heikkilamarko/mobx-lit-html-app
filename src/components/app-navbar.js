import { html } from 'lit-element';
import { MobxLitElement } from '../utils';
import { classMap } from 'lit-html/directives/class-map';
import routeStore from '../stores/routeStore';

export class AppNavbar extends MobxLitElement {
  navigateHome(event) {
    event.preventDefault();
    routeStore.navigate('browse');
  }

  navigateCounter(event) {
    event.preventDefault();
    routeStore.navigate('counter');
  }

  render() {
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
            </ul>
          </div>
        </div>
      </nav>
    `;
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define('app-navbar', AppNavbar);
