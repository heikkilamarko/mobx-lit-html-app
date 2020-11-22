import { html } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';
import { stores } from '../shared/stores';
import {
  addRenderReaction,
  clearReactions,
  preventDefault,
} from '../shared/utils';

const GITHUB_URL = import.meta.env.SNOWPACK_PUBLIC_GITHUB_URL;

function navItems() {
  const { routeStore, widgetsStore, i18nStore } = stores;

  return routeStore.routes
    .filter(({ navbar }) => navbar)
    .map(({ name }) =>
      navItem({
        title: i18nStore.t(name),
        active: routeStore.isActive(name),
        href: routeStore.buildPath(name),
        handleClick: () =>
          routeStore.navigate(
            name,
            name === 'widgets' ? widgetsStore.widgetId ?? undefined : undefined,
          ),
      }),
    );
}

function navItem({ title, active, href, handleClick }) {
  return html`
    <li class="nav-item">
      <a
        class=${classMap({ 'nav-link': true, active })}
        href=${href}
        @click=${preventDefault(handleClick)}
        >${title}</a
      >
    </li>
  `;
}

export class Navbar extends HTMLElement {
  connectedCallback() {
    addRenderReaction(this);
  }

  disconnectedCallback() {
    clearReactions(this);
  }

  render() {
    const {
      routeStore: { navigate, route: _ },
    } = stores;

    return html`
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container-fluid">
          <a
            class="navbar-brand"
            @click="${preventDefault(() => navigate('browse'))}"
            href="/browse"
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
              ${navItems()}
            </ul>
            <div class="d-flex text-white py-2 mx-auto">
              <app-clock></app-clock>
            </div>
            <ul class="navbar-nav">
              <li class="nav-item dropdown">
                <app-locale-picker></app-locale-picker>
              </li>
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
  }
}
