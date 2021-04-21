import { autorun, reaction } from 'mobx';
import { render } from 'lit';

const R = Symbol('reactions');
const I = Symbol('intervals');

export function createElement({ tagName, props }) {
  const ctor = customElements.get(tagName);
  return ctor ? Object.assign(document.createElement(tagName), props) : null;
}

export function addReaction(target, reactionDisposer) {
  (target[R] ??= []).push(reactionDisposer);
}

export function addRenderReaction(target, templateFn, options = undefined) {
  templateFn ??= target.render.bind(target);
  addReaction(
    target,
    autorun(() => render(templateFn(), target, { host: target }), options),
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
  target[R]?.forEach((r) => r());
  target[R] = [];
}

export function addInterval(target, fn, delay) {
  (target[I] ??= []).push(setInterval(fn, delay));
}

export function clearIntervals(target) {
  target[I]?.forEach((h) => clearInterval(h));
  target[I] = [];
}

export function preventDefault(fn) {
  return function (event) {
    event.preventDefault();
    return fn.call(this, event);
  };
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
