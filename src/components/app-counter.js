import { html } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { dashCircle, plusCircle, xCircle } from './icons';
import { MobxLitElement } from '../utils';
import { counterStore } from '../stores';
import './app-counter-modal';
import './app-counter.css';

export class AppCounter extends MobxLitElement {
  disconnectedCallback() {
    this.modal?.hide();
    this.modal?.dispose();
    this.modal = undefined;
    super.disconnectedCallback();
  }

  handleIncrement(event) {
    event.preventDefault();
    counterStore.increment();
  }

  handleDecrement(event) {
    event.preventDefault();
    counterStore.decrement();
  }

  handleReset(event) {
    event.preventDefault();
    this.modal ??= new bootstrap.Modal(
      document.getElementById('app-counter-modal'),
      {},
    );
    this.modal.show();
  }

  handleResetOk(_event) {
    this.modal?.hide();
    counterStore.reset();
  }

  handleResetCancel(_event) {
    this.modal?.hide();
  }

  render() {
    const value = counterStore.value;

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
            <p class="card-text">Counter</p>
            <a
              href
              class="btn btn-link text-danger"
              @click="${this.handleDecrement}"
            >
              ${dashCircle}
            </a>
            <a
              href
              class="btn btn-link text-success"
              @click="${this.handleIncrement}"
            >
              ${plusCircle}
            </a>
            <a href class="btn btn-link" @click="${this.handleReset}">
              ${xCircle}
            </a>
          </div>
        </div>
      </section>
      <app-counter-modal
        @modal-ok=${this.handleResetOk}
        @modal-cancel=${this.handleResetCancel}
      ></app-counter-modal>
    `;
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define('app-counter', AppCounter);
