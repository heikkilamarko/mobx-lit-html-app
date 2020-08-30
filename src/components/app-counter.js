import { html } from 'lit-element';
import { MobxLitElement } from '@adobe/lit-mobx';
import counterStore from '../stores/CounterStore';
import './app-counter.css';

export class AppCounter extends MobxLitElement {
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
    counterStore.reset();
  }

  render() {
    return html`
      <section class="d-flex align-items-center justify-content-center p-4">
        <div class="card app-counter-card">
          <div class="card-body">
            <h4 class="card-title">${counterStore.value}</h4>
            <p class="card-text">Demo counter</p>
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
