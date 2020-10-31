import { html, nothing } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';
import { stores } from '../stores';
import { addRenderReaction, clearReactions, preventDefault } from '../utils';

function textField(field) {
  const { t } = stores.i18nStore;

  const feedbackId = `${field.id}_feedback`;

  return html`
    <div class="mb-3">
      ${field.data?.label
        ? html`
            <label for=${field.id} class="form-label">
              ${t(field.data.label)}
              ${field.data?.isRequired
                ? html`<span class="text-danger">*</span>`
                : nothing}
            </label>
          `
        : nothing}
      <input
        type="text"
        class=${classMap({
          'form-control': true,
          'is-invalid': field.isInvalidTouched,
        })}
        id=${field.id}
        aria-describedby=${feedbackId}
        placeholder=${t(field.data?.placeholder)}
        .value=${field.value}
        @input=${(event) => {
          field.setTouched();
          field.setValue(event.target.value);
        }}
      />
      ${field.isInvalidTouched
        ? html`
            <div id=${feedbackId} class="invalid-feedback">
              ${t(field.error)}
            </div>
          `
        : nothing}
    </div>
  `;
}

class AppForm extends HTMLElement {
  connectedCallback() {
    addRenderReaction(this, () => {
      const { t } = stores.i18nStore;
      const {
        fields: { firstName, lastName, username },
        canSubmit,
        canReset,
        submit,
        reset,
      } = stores.formStore;

      return html`
        <form autocomplete="off" @submit=${preventDefault(submit)}>
          ${textField(firstName)} ${textField(lastName)} ${textField(username)}
          <div class="pt-3">
            <button
              type="submit"
              class="btn btn-primary"
              ?disabled=${!canSubmit}
            >
              ${t('form.submit')}
            </button>
            <button
              type="submit"
              class="btn btn-outline-primary ml-3"
              ?disabled=${!canReset}
              @click=${reset}
            >
              ${t('form.reset')}
            </button>
          </div>
        </form>
      `;
    });
  }

  disconnectedCallback() {
    clearReactions(this);
  }
}

customElements.define('app-form', AppForm);
