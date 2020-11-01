import { html, nothing } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';
import { computed, makeObservable, observable } from 'mobx';
import { stores } from '../../stores';
import { addRenderReaction, clearReactions } from '../../utils';
import './app-form-tags-field.css';

class AppFormTagsField extends HTMLElement {
  tag = '';

  constructor() {
    super();
    makeObservable(this, {
      tag: observable.ref,
      canAddTag: computed,
    });
  }

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
          <div class="input-group mb-2">
            <input
              type="text"
              class=${classMap({
                'form-control': true,
                'is-invalid': isTouchedInvalid,
                'is-valid': isTouchedValid,
              })}
              id=${id}
              aria-describedby=${feedbackId}
              placeholder=${placeholder}
              .value=${this.tag}
              @input=${(event) => (this.tag = event.target.value)}
            />
            <button
              class="btn btn-primary"
              type="button"
              ?disabled=${!this.canAddTag}
              @click=${() => {
                setTouched();
                setValue([...value, this.tag]);
                this.tag = '';
              }}
            >
              ${t('form.tags.add')}
            </button>
            ${isValidating
              ? html`
                  <div id=${feedbackId} class="form-text">
                    ${t('form.validating')}
                  </div>
                `
              : isTouchedInvalid
              ? html`
                  <div id=${feedbackId} class="invalid-feedback">
                    ${t(error)}
                  </div>
                `
              : nothing}
          </div>
          <div>
            ${value.map(
              (tag) =>
                html`
                  <span
                    class="d-inline-flex flex-row align-items-center badge rounded-pill bg-primary mb-1 pl-3"
                    >${tag}
                    <button
                      type="button"
                      class="btn-close btn-close-white ml-2"
                      aria-label=${t('close')}
                      @click=${() => {
                        setTouched();
                        setValue(value.filter((v) => v !== tag));
                      }}
                    ></button
                  ></span>
                `,
            )}
          </div>
        </div>
      `;
    });
  }

  disconnectedCallback() {
    clearReactions(this);
  }

  get canAddTag() {
    return !!this.tag && !this.field.value.includes(this.tag);
  }
}

customElements.define('app-form-tags-field', AppFormTagsField);
