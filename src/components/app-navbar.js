import { LitElement, html } from 'lit-element';
import routeStore from '../stores/routeStore';

export class AppNavbar extends LitElement {
  navigateHome(event) {
    event.preventDefault();
    routeStore.navigate('browse');
  }

  render() {
    return html`
      <nav class="navbar navbar-dark bg-primary">
        <a class="navbar-brand" @click="${this.navigateHome}" href="/">
          LitElement App
        </a>
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" @click="${this.navigateHome}" href="/"
              >Browse</a
            >
          </li>
        </ul>
      </nav>
    `;
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define('app-navbar', AppNavbar);
