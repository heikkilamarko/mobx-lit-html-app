import { html, nothing } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';
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
        <section class="d-flex align-items-center justify-content-center p-4">
          <div class="card app-counter-card">
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
                  ? html`
                      <span class="text-muted app-counter-card__minmax"
                        >min</span
                      >
                    `
                  : value === MAX_VALUE
                  ? html`
                      <span class="text-muted app-counter-card__minmax"
                        >max</span
                      >
                    `
                  : nothing}
              </h1>
              <p class="card-text">${t('counter')}</p>
              <button
                class="btn btn-link text-danger"
                ?disabled=${value === MIN_VALUE}
                @click="${() => this.handleDecrement()}"
              >
                ${dashCircle}
              </button>
              <button
                class="btn btn-link text-success"
                ?disabled=${value === MAX_VALUE}
                @click="${() => this.handleIncrement()}"
              >
                ${plusCircle}
              </button>
              <button
                class="btn btn-link"
                ?disabled=${value === 0}
                @click=${() => this.handleReset()}
              >
                ${xCircle}
              </button>
            </div>
          </div>
        </section>
        <app-counter-modal
          @ok=${() => this.handleResetOk()}
          @cancel=${() => this.handleResetCancel()}
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
    this.modal ??= new bootstrap.Modal(
      this.querySelector('app-counter-modal > .modal'),
    );
    this.modal.show();
  }

  handleResetOk() {
    this.modal?.hide();
    stores.counterStore.reset();
  }

  handleResetCancel() {
    this.modal?.hide();
  }
}

customElements.define('app-counter', AppCounter);
