import { html, nothing } from 'lit-html';
import { makeObservable, observable } from 'mobx';
import { addRenderReaction, clearReactions } from '../utils';
import './app-error.css';

class AppError extends HTMLElement {
  title = 'Error';
  text = null;

  constructor() {
    super();
    makeObservable(this, {
      title: observable.ref,
      text: observable.ref,
    });
  }

  connectedCallback() {
    addRenderReaction(
      this,
      () => html`
        <section
          class="d-flex align-items-center justify-content-center p-4 app-error"
        >
          <div class="card text-center text-danger">
            <div class="card-body">
              <h5 class="card-title">${this.title}</h5>
              ${this.text
                ? html`<p class="card-text">${this.text}</p>`
                : nothing}
            </div>
          </div>
        </section>
      `,
    );
  }

  disconnectedCallback() {
    clearReactions(this);
  }
}

customElements.define('app-error', AppError);
