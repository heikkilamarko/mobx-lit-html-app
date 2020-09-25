import { html } from 'lit-html';
import { action, makeObservable, observable } from 'mobx';
import {
  addRenderReaction,
  addInterval,
  clearReactions,
  clearIntervals,
} from '../utils';

const timeFormat = new Intl.DateTimeFormat('default', {
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
});

class AppClock extends HTMLElement {
  time;

  constructor() {
    super();
    makeObservable(this, {
      time: observable.ref,
      updateTime: action,
    });
    this.updateTime();
  }

  connectedCallback() {
    addInterval(this, () => this.updateTime(), 1000);

    addRenderReaction(
      this,
      () => html`<div class="font-monospace">${this.time}</div>`,
    );
  }

  disconnectedCallback() {
    clearReactions(this);
    clearIntervals(this);
  }

  updateTime() {
    this.time = timeFormat.format(new Date());
  }
}

customElements.define('app-clock', AppClock);
