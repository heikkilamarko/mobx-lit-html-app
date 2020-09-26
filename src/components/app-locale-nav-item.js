import { html } from 'lit-html';
import { stores } from '../stores';
import { addRenderReaction, clearReactions } from '../utils';

class AppLocaleNavItem extends HTMLLIElement {
  connectedCallback() {
    addRenderReaction(this, () => {
      const { locale, locales } = stores.i18nStore;

      return html`
        <a
          class="nav-link dropdown-toggle"
          href="#"
          id="localeDropdown"
          role="button"
          data-toggle="dropdown"
          aria-expanded="false"
        >
          ${locale}
        </a>
        <ul class="dropdown-menu" aria-labelledby="localeDropdown">
          ${locales.map(
            (l) => html`
              <li>
                <a
                  class="dropdown-item"
                  href
                  @click=${(event) => this.handleClick(event, l)}
                  >${l}</a
                >
              </li>
            `,
          )}
        </ul>
      `;
    });
  }

  disconnectedCallback() {
    clearReactions(this);
  }

  handleClick(event, locale) {
    event.preventDefault();
    stores.i18nStore.setLocale(locale);
  }
}

customElements.define('app-locale-nav-item', AppLocaleNavItem, {
  extends: 'li',
});
