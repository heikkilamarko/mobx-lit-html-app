import { html } from 'lit';
import { stores } from '../shared/stores';
import { addRenderReaction, clearReactions } from '../shared/utils';

export class LocalePicker extends HTMLElement {
  connectedCallback() {
    addRenderReaction(this);
  }

  disconnectedCallback() {
    clearReactions(this);
  }

  render() {
    const { locale, localesExcludeCurrent } = stores.i18nStore;

    return html`
      <a
        class="nav-link dropdown-toggle"
        href="#"
        id="localeDropdown"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        ${locale}
      </a>
      <ul
        class="dropdown-menu dropdown-menu-end"
        aria-labelledby="localeDropdown"
      >
        ${localesExcludeCurrent.map(
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
  }

  handleClick(event, locale) {
    event.preventDefault();
    stores.i18nStore.setLocale(locale);
  }
}
