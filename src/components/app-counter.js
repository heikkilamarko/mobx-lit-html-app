import { html } from 'lit-element';
import { MobxLitElement } from '@adobe/lit-mobx';
import './app-error.css';
import CounterStore from '../stores/CounterStore';
import './app-counter.css';

const counter = new CounterStore();

export class AppCounter extends MobxLitElement {
  handleIncrement(event) {
    event.preventDefault();
    counter.increment();
  }

  handleDecrement(event) {
    event.preventDefault();
    counter.decrement();
  }

  handleReset(event) {
    event.preventDefault();
    counter.reset();
  }

  render() {
    return html`
      <section class="d-flex align-items-center justify-content-center p-4">
        <div class="card app-detail-card">
          <div class="card-body">
            <h4 class="card-title">${counter.value}</h4>
            <p class="card-text">Demo counter implemented with MobX.</p>
            <a href class="btn btn-primary" @click="${this.handleDecrement}">
              -
            </a>
            <a href class="btn btn-primary" @click="${this.handleIncrement}">
              +
            </a>
            <a href class="btn btn-primary" @click="${this.handleReset}">
              Reset
            </a>
          </div>
        </div>
      </section>
    `;
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define('app-counter', AppCounter);
