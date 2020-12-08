import { html, nothing } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';
import Modal from 'bootstrap/js/dist/modal';
import { stores } from '../shared/stores';
import { addRenderReaction, clearReactions } from '../shared/utils';
import { dashCircle, plusCircle, xCircle } from '../shared/icons';
import './Counter.css';

export class Counter extends HTMLElement {
  connectedCallback() {
    addRenderReaction(this);
  }

  disconnectedCallback() {
    clearReactions(this);

    if (this.modal) {
      this.modal._element?.classList.remove('fade');
      this.modal.hide();
      this.modal.dispose();
      this.modal = undefined;
    }
  }

  render() {
    const { t } = stores.i18nStore;
    const { value, progress, minValue, maxValue } = stores.counterStore;

    return html`
      <div class="card mx-auto">
        <div class="card-body">
          <h1
            class=${classMap({
              'card-title': true,
              'display-1': true,
              'text-danger': value < 0,
              'text-primary': value === 0,
              'text-success': 0 < value,
            })}
          >
            ${value}
            ${value === minValue
              ? html`<span class="text-muted display-6">min</span>`
              : value === maxValue
              ? html`<span class="text-muted display-6">max</span>`
              : nothing}
          </h1>
          <div class="progress mb-5" style="height:4px">
            <div
              class=${classMap({
                'progress-bar': true,
                'bg-danger': value < 0,
                'bg-success': 0 < value,
              })}
              role="progressbar"
              style="width: ${progress}%"
              aria-valuenow=${value}
              aria-valuemin=${minValue}
              aria-valuemax=${maxValue}
            ></div>
          </div>
          <button
            aria-label=${t('counter.decrement')}
            class="btn btn-link text-danger p-0 me-4"
            ?disabled=${value === minValue}
            @click="${this.handleDecrement}"
          >
            ${dashCircle('app-btn-icon')}
          </button>
          <button
            aria-label=${t('counter.increment')}
            class="btn btn-link text-success p-0"
            ?disabled=${value === maxValue}
            @click="${this.handleIncrement}"
          >
            ${plusCircle('app-btn-icon')}
          </button>
          <button
            aria-label=${t('counter.reset')}
            class="btn btn-link float-end p-0"
            ?disabled=${value === 0}
            @click=${this.handleReset}
          >
            ${xCircle('app-btn-icon')}
          </button>
        </div>
      </div>
      <app-counter-modal @ok=${this.handleResetOk}></app-counter-modal>
    `;
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

    const { t } = stores.i18nStore;

    stores.toastStore.show({
      title: t('counter'),
      body: t('counter.toast.message'),
    });
  }
}
