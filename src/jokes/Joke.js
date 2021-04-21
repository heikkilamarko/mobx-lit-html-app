import { html } from 'lit';
import { makeObservable, observable } from 'mobx';
import {
  addRenderReaction,
  addWatchReaction,
  clearReactions,
} from '../shared/utils';

export class Joke extends HTMLElement {
  text;

  constructor() {
    super();
    makeObservable(this, {
      text: observable.ref,
    });
  }

  connectedCallback() {
    addRenderReaction(this);

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

  render() {
    return html`<h1 class="display-6 text-primary">${this.text}</h1>`;
  }
}
