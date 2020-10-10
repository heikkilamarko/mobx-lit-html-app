import { autorun, configure, reaction } from 'mobx';
import { html, nothing, render } from 'lit-html';

const GA_MEASUREMENT_ID = import.meta.env.SNOWPACK_PUBLIC_GA_MEASUREMENT_ID;

const R = Symbol('reactions');
const I = Symbol('intervals');

export function configureMobX() {
  configure({
    enforceActions: 'never',
    observableRequiresReaction: false,
    computedRequiresReaction: true,
    reactionRequiresObservable: true,
    isolateGlobalState: true,
  });
}

export function renderApp({
  tagName = 'app-root',
  props = {},
  target = document.body,
} = {}) {
  const el = createElement({ tagName, props });

  if (!el) {
    throw new Error(
      `Element <${tagName}> not found in the custom element registry.`,
    );
  }

  target.appendChild(el);
}

export function renderAppStartupError({
  title = 'Close, but No Cigar',
  message,
} = {}) {
  render(
    html`
      <main
        class="px-4 py-5 overflow-auto d-flex flex-column align-items-center vh-100 bg-danger text-white"
      >
        <h1 class="display-1 font-weight-lighter">${title}</h1>
        ${message ? html`<p class="pt-2">${message}</p>` : nothing}
      </main>
    `,
    document.body,
  );
}

export function createElement({ tagName, props }) {
  const ctor = customElements.get(tagName);
  return ctor ? Object.assign(document.createElement(tagName), props) : null;
}

export function addReaction(target, reactionDisposer) {
  (target[R] ??= []).push(reactionDisposer);
}

export function addRenderReaction(target, templateFn, options = undefined) {
  addReaction(
    target,
    autorun(
      () => render(templateFn(), target, { eventContext: target }),
      options,
    ),
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

export function addInterval(target, fn, delay) {
  (target[I] ??= []).push(setInterval(fn, delay));
}

export function clearIntervals(target) {
  target[I] && target[I].forEach((h) => clearInterval(h));
  target[I] = [];
}

export function analyticsPageview(path) {
  if (window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, { page_path: path });
  }
}

export function runDefaultPrevented(fn) {
  return (event) => {
    event.preventDefault();
    return fn(event);
  };
}

export function getPrimaryColor() {
  return window
    .getComputedStyle(document.body)
    .getPropertyValue('--bs-primary')
    .trim();
}
