import { Reaction } from 'mobx';
import { LitElement } from 'lit-element';

export function noop() {}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const reactionSymbol = Symbol();
const requestUpdateSymbol = Symbol();

export class MobxLitElement extends LitElement {
  constructor() {
    super();
    this[reactionSymbol] = null;
    this[requestUpdateSymbol] = () => this.requestUpdate();
  }

  connectedCallback() {
    super.connectedCallback();

    this[reactionSymbol] = new Reaction('reaction', this[requestUpdateSymbol]);

    if (this.hasUpdated) {
      this.requestUpdate();
    }
  }

  disconnectedCallback() {
    if (this[reactionSymbol]) {
      this[reactionSymbol].dispose();
      this[reactionSymbol] = null;
    }

    super.disconnectedCallback();
  }

  update(changedProperties) {
    if (this[reactionSymbol]) {
      this[reactionSymbol].track(super.update.bind(this, changedProperties));
    } else {
      super.update(changedProperties);
    }
  }
}
