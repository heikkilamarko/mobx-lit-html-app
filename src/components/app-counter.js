import { html } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';
import { stores } from '../stores';
import { addRenderReaction, addWatchReaction, clearReactions } from '../utils';
import { dashCircle, plusCircle, xCircle } from './icons';
import './app-counter-modal';
import './app-counter.css';

class AppCounter extends HTMLElement {
  connectedCallback() {
    const { t } = stores.i18nStore;

    addWatchReaction(
      this,
      () => stores.counterStore.value,
      (value) => {
        if (value < -10) {
          stores.counterStore.setValue(-10);
          alert(t('counter.alert.min', { value: -10 }));
        } else if (10 < value) {
          stores.counterStore.setValue(10);
          alert(t('counter.alert.max', { value: 10 }));
        }
      },
    );

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
              </h1>
              <p class="card-text">${t('counter')}</p>
              <a
                href
                class="btn btn-link text-danger"
                @click="${(event) => this.handleDecrement(event)}"
              >
                ${dashCircle}
              </a>
              <a
                href
                class="btn btn-link text-success"
                @click="${(event) => this.handleIncrement(event)}"
              >
                ${plusCircle}
              </a>
              <a
                href
                class="btn btn-link"
                @click=${(event) => this.handleReset(event)}
              >
                ${xCircle}
              </a>
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

  handleDecrement(event) {
    event.preventDefault();
    stores.counterStore.decrement();
  }

  handleIncrement(event) {
    event.preventDefault();
    stores.counterStore.increment();
  }

  handleReset(event) {
    event.preventDefault();
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
