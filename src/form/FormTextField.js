import { html, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { stores } from '../shared/stores';
import { addRenderReaction, clearReactions } from '../shared/utils';

export class FormTextField extends HTMLElement {
  connectedCallback() {
    addRenderReaction(this);
  }

  disconnectedCallback() {
    clearReactions(this);
  }

  render() {
    const { t } = stores.i18nStore;

    if (!this.field) {
      return nothing;
    }

    const { id, value, error, data, isTouched, isValid, isValidating } =
      this.field;

    const feedbackId = `${id}_feedback`;

    const label = data?.label ? t(data.label) : undefined;
    const isRequired = !!data?.isRequired;

    const placeholder = data?.placeholder ? t(data.placeholder) : undefined;

    const isTouchedInvalid = !isValid && isTouched && !isValidating;
    const isTouchedValid = isValid && isTouched && !isValidating;

    return html`
      ${label
        ? html`
            <label for=${id} class="form-label">
              ${label}
              ${isRequired ? html`<span class="text-danger">*</span>` : nothing}
            </label>
          `
        : nothing}
      <input
        type="text"
        spellcheck="false"
        class=${classMap({
          'form-control': true,
          'is-invalid': isTouchedInvalid,
          'is-valid': isTouchedValid,
        })}
        id=${id}
        aria-describedby=${feedbackId}
        placeholder=${placeholder}
        .value=${value}
        @input=${this.handleInput}
      />
      ${isValidating
        ? html`
            <div id=${feedbackId} class="form-text">
              ${t('form.validating')}
            </div>
          `
        : isTouchedInvalid
        ? html`
            <div id=${feedbackId} class="invalid-feedback">${t(error)}</div>
          `
        : nothing}
    `;
  }

  handleInput(event) {
    const { id, value, data, isValidating, setValue, setTouched } = this.field;
    const isTouchDisabled = !!data?.isTouchDisabled;

    if (isValidating) {
      this.querySelector(`#${id}`).value = value;
    } else {
      !isTouchDisabled && setTouched();
      setValue(event.target.value);
    }
  }
}
