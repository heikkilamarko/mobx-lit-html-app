import { html, render } from 'lit-html';
import { stores } from '../stores';
import './app-browse-card.css';

class AppBrowseCard extends HTMLElement {
  connectedCallback() {
    render(
      html`
        <a
          class="card text-center app-browse-card"
          href=${stores.routeStore.buildPath('detail', { id: this.data.id })}
        >
          <div class="card-body">
            <h4 class="card-title text-truncate">${this.data.name}</h4>
            <img src="${this.data.logo_url}" alt="logo" />
          </div>
        </a>
      `,
      this,
    );
  }
}

customElements.define('app-browse-card', AppBrowseCard);
