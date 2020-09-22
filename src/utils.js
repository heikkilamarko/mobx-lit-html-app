import { autorun, reaction, Reaction } from 'mobx';
import { LitElement } from 'lit-element';
import { render } from 'lit-html';

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
    this[reactionSymbol]?.dispose();
    this[reactionSymbol] = null;

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

export function createElement({ tagName, props }) {
  const ctor = customElements.get(tagName);
  return ctor ? Object.assign(document.createElement(tagName), props) : null;
}

export function addReaction(target, reactionDisposer) {
  (target._r ??= []).push(reactionDisposer);
}

export function addRenderReaction(target, templateFn) {
  addReaction(
    target,
    autorun(() => render(templateFn(), target)),
  );
}

export function addWatchReaction(
  target,
  triggerFn,
  effectFn,
  options = undefined,
) {
  addReaction(target, reaction(triggerFn, effectFn, options));
}

export function clearReactions(target) {
  target._r && target._r.forEach((r) => r());
}

export function addInterval(target, intervalHandle) {
  (target._i ??= []).push(intervalHandle);
}

export function clearIntervals(target) {
  target._i && target._i.forEach((h) => clearInterval(h));
}
