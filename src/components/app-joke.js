import { html } from 'lit-html';
import { makeObservable, observable } from 'mobx';
import { addRenderReaction, addWatchReaction, clearReactions } from '../utils';

class AppJoke extends HTMLElement {
  text;

  constructor() {
    super();
    makeObservable(this, {
      text: observable.ref,
    });
  }

  connectedCallback() {
    addRenderReaction(
      this,
      () => html`<h1 class="display-6 text-primary">${this.text}</h1>`,
    );

    addWatchReaction(
      this,
      () => this.text,
      () => {
        this.querySelector('h1')?.animate(
          [
            { transform: 'translateX(-100px)', opacity: 0 },
            { transform: 'translateX(0)', opacity: 1 },
          ],
          {
            duration: 400,
          },
        );
      },
    );
  }

  disconnectedCallback() {
    clearReactions(this);
  }
}

customElements.define('app-joke', AppJoke);
