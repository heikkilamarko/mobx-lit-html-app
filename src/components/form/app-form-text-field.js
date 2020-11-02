import { html, nothing } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';
import { stores } from '../../stores';
import { addRenderReaction, clearReactions } from '../../utils';

class AppFormTextField extends HTMLElement {
  connectedCallback() {
    addRenderReaction(this, () => {
      const { t } = stores.i18nStore;

      if (!this.field) {
        return nothing;
      }

      const {
        id,
        value,
        error,
        data,
        isTouched,
        isValid,
        isValidating,
        setValue,
        setTouched,
      } = this.field;

      const feedbackId = `${id}_feedback`;

      const label = data?.label ? t(data.label) : undefined;
      const isRequired = !!data?.isRequired;
      const isTouchDisabled = !!data?.isTouchDisabled;
      const placeholder = data?.placeholder ? t(data.placeholder) : undefined;

      const isTouchedInvalid = !isValid && isTouched && !isValidating;
      const isTouchedValid = isValid && isTouched && !isValidating;

      return html`
        <div class="mb-3">
          ${label
            ? html`
                <label for=${id} class="form-label">
                  ${label}
                  ${isRequired
                    ? html`<span class="text-danger">*</span>`
                    : nothing}
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
            ?readonly=${isValidating}
            .value=${value}
            @input=${(event) => {
              !isTouchDisabled && setTouched();
              setValue(event.target.value);
            }}
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
        </div>
      `;
    });
  }

  disconnectedCallback() {
    clearReactions(this);
  }
}

customElements.define('app-form-text-field', AppFormTextField);
