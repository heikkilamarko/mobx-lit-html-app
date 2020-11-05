import { html } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';
import { stores } from '../stores';
import { addRenderReaction, clearReactions, preventDefault } from '../utils';
import './app-locale-picker';
import './app-clock';

const GITHUB_URL = import.meta.env.SNOWPACK_PUBLIC_GITHUB_URL;

function navItems() {
  const {
    routeStore: r,
    widgetsStore: w,
    i18nStore: { t },
  } = stores;

  const id = w.widgetId ?? undefined;

  return [
    {
      title: t('browse'),
      active: ['browse', 'detail'].includes(r.routeName),
      href: r.buildPath('browse'),
      handleClick: () => r.navigate('browse'),
    },
    {
      title: t('counter'),
      active: ['counter'].includes(r.routeName),
      href: r.buildPath('counter'),
      handleClick: () => r.navigate('counter'),
    },
    {
      title: t('jokes'),
      active: ['jokes'].includes(r.routeName),
      href: r.buildPath('jokes'),
      handleClick: () => r.navigate('jokes'),
    },
    {
      title: t('datagrid'),
      active: ['datagrid'].includes(r.routeName),
      href: r.buildPath('datagrid'),
      handleClick: () => r.navigate('datagrid'),
    },
    {
      title: t('charts'),
      active: ['charts'].includes(r.routeName),
      href: r.buildPath('charts'),
      handleClick: () => r.navigate('charts'),
    },
    {
      title: t('form'),
      active: ['form'].includes(r.routeName),
      href: r.buildPath('form'),
      handleClick: () => r.navigate('form'),
    },
    {
      title: t('widgets'),
      active: ['widgets'].includes(r.routeName),
      href: r.buildPath('widgets', { id }),
      handleClick: () => r.navigate('widgets', { id }),
    },
  ].map(navItem);
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
    });
  }

  disconnectedCallback() {
    clearReactions(this);
  }
}

customElements.define('app-navbar', AppNavbar);
