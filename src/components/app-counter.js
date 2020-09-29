import { html, nothing } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';
import Modal from 'bootstrap/js/dist/modal';
import { stores } from '../stores';
import { addRenderReaction, clearReactions } from '../utils';
import { dashCircle, plusCircle, xCircle } from './icons';
import './app-counter-modal';
import './app-counter.css';

const MIN_VALUE = -10;
const MAX_VALUE = 10;

class AppCounter extends HTMLElement {
  connectedCallback() {
    const { t } = stores.i18nStore;

    addRenderReaction(this, () => {
      const value = stores.counterStore.value;

      return html`
        <div class="card mx-auto app-counter">
          <div class="card-body">
            <h1
              class=${classMap({
                'card-title': true,
                'display-1': true,
                'text-danger': value < 0,
                'text-success': 0 < value,
              })}
            >
              ${value}
              ${value === MIN_VALUE
                ? html`<span class="text-muted display-6">min</span>`
                : value === MAX_VALUE
                ? html`<span class="text-muted display-6">max</span>`
                : nothing}
            </h1>
            <p class="card-text">${t('counter')}</p>
            <button
              class="btn btn-link text-danger p-0 mr-4"
              ?disabled=${value === MIN_VALUE}
              @click="${() => this.handleDecrement()}"
            >
              ${dashCircle('app-counter__icon')}
            </button>
            <button
              class="btn btn-link text-success p-0"
              ?disabled=${value === MAX_VALUE}
              @click="${() => this.handleIncrement()}"
            >
              ${plusCircle('app-counter__icon')}
            </button>
            <button
              class="btn btn-link float-right p-0"
              ?disabled=${value === 0}
              @click=${() => this.handleReset()}
            >
              ${xCircle('app-counter__icon')}
            </button>
          </div>
        </div>
        <app-counter-modal
          @ok=${() => this.handleResetOk()}
        ></app-counter-modal>
      `;
    });
  }

  disconnectedCallback() {
    clearReactions(this);

    this.modal?.hide();
    this.modal?.dispose();
    this.modal = undefined;
  }

  handleDecrement() {
    stores.counterStore.decrement();
  }

  handleIncrement() {
    stores.counterStore.increment();
  }

  handleReset() {
    this.modal ??= new Modal(this.querySelector('app-counter-modal > .modal'));
    this.modal.show();
  }

  handleResetOk() {
    this.modal?.hide();
    stores.counterStore.reset();
  }
}

customElements.define('app-counter', AppCounter);
