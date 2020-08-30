import { html } from 'lit-element';
import { MobxLitElement } from '../utils';
import browseStore from '../stores/browseStore';
import './app-browse-card';
import './app-error';

export class AppBrowse extends MobxLitElement {
  firstUpdated() {
    browseStore.load();
  }

  render() {
    return html`
      ${browseStore.hasError
        ? html`<app-error text="${browseStore.error.message}"></app-error>`
        : html`
            <div class="row p-2">
              ${browseStore.items.map(
                (item) =>
                  html`<app-browse-card
                    class="col-6 col-md-4 col-lg-3 p-2"
                    .data="${item}"
                  />`,
              )}
            </div>
          `}
    `;
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define('app-browse', AppBrowse);
