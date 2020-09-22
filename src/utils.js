import { autorun, reaction } from 'mobx';
import { render } from 'lit-html';

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
