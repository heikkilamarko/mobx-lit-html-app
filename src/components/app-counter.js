import { html, render } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';
import { autorun, reaction } from 'mobx';
import { dashCircle, plusCircle, xCircle } from './icons';
import { counterStore } from '../stores';
import { addReaction, clearReactions } from '../utils';
import './app-counter-modal';
import './app-counter.css';

// This is an experimental custom element / web component
// implemented without LitElement.

class AppCounter extends HTMLElement {
  connectedCallback() {
    addReaction(
      this,
      reaction(
        () => counterStore.value,
        (value) => {
          if (value < -10) {
            counterStore.value = -10;
            alert('-10 is the minimum value!');
          } else if (10 < value) {
            counterStore.value = 10;
            alert('10 is the maximum value!');
          }
        },
      ),
    );

    addReaction(
      this,
      autorun(() => {
        const value = counterStore.value;
        render(
          html`
            <section
              class="d-flex align-items-center justify-content-center p-4"
            >
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
                    @click="${this.handleDecrement.bind(this)}"
                  >
                    ${dashCircle}
                  </a>
                  <a
                    href
                    class="btn btn-link text-success"
                    @click="${this.handleIncrement.bind(this)}"
                  >
                    ${plusCircle}
                  </a>
                  <a
                    href
                    class="btn btn-link"
                    @click=${this.handleReset.bind(this)}
                  >
                    ${xCircle}
                  </a>
                </div>
              </div>
            </section>
            <app-counter-modal
              @modal-ok=${this.handleResetOk.bind(this)}
              @modal-cancel=${this.handleResetCancel.bind(this)}
            ></app-counter-modal>
          `,
          this,
        );
      }),
    );
  }

  disconnectedCallback() {
    clearReactions(this);

    this.modal?.hide();
    this.modal?.dispose();
    this.modal = undefined;
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
}

customElements.define('app-counter', AppCounter);
