import { LitElement, html } from 'lit-element';
import { nothing } from 'lit-html';
import './app-error.css';

export class AppError extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      text: { type: String },
    };
  }

  constructor() {
    super();
    this.title = 'Error';
    this.text = null;
  }

  render() {
    return html`
      <section
        class="d-flex align-items-center justify-content-center p-4 app-error"
      >
        <div class="card text-center text-danger">
          <div class="card-body">
            <h5 class="card-title">${this.title}</h5>
            ${this.text ? html`<p class="card-text">${this.text}</p>` : nothing}
          </div>
        </div>
      </section>
    `;
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define('app-error', AppError);
