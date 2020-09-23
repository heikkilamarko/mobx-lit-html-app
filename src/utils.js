import { autorun, reaction } from 'mobx';
import { render } from 'lit-html';

const R = Symbol('reactions');
const I = Symbol('intervals');

export function renderApp(options) {
  const el = createElement(options);

  if (!el) {
    throw new Error(
      `Element <${options.tagName}> not found in the custom element registry.`,
    );
  }

  (options.target ?? document.body).appendChild(el);
}

export function createElement({ tagName, props }) {
  const ctor = customElements.get(tagName);
  return ctor ? Object.assign(document.createElement(tagName), props) : null;
}

export function addReaction(target, reactionDisposer) {
  (target[R] ??= []).push(reactionDisposer);
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
  target[R] && target[R].forEach((r) => r());
  target[R] = [];
}

export function addInterval(target, intervalHandle) {
  (target[I] ??= []).push(intervalHandle);
}

export function clearIntervals(target) {
  target[I] && target[I].forEach((h) => clearInterval(h));
  target[I] = [];
}
