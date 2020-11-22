import { html, render } from 'lit-html';
import { stores } from '../shared/stores';
import './BrowseCard.css';

export class BrowseCard extends HTMLElement {
  connectedCallback() {
    render(
      html`
        <a
          class="card text-center app-browse-card"
          href=${stores.routeStore.buildPath('browse.detail', {
            id: this.data.id,
          })}
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
