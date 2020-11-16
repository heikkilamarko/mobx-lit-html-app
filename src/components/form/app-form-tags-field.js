import { html, nothing } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';
import { action, computed, makeObservable } from 'mobx';
import { stores } from '../../stores';
import { validateRequired } from '../../validators';
import { addRenderReaction, clearReactions } from '../../utils';

class AppFormTagsField extends HTMLElement {
  constructor() {
    super();
    makeObservable(this, {
      canAddTag: computed,
      addTag: action.bound,
      removeTag: action.bound,
    });
  }

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

    const {
      id,
      value,
      helperValue,
      error,
      data,
      isTouched,
      isValid,
      isValidating,
      setHelperValue,
    } = this.field;

    const feedbackId = `${id}_feedback`;

    const label = data?.label ? t(data.label) : undefined;
    const isRequired = !!data?.isRequired;
    const placeholder = data?.placeholder ? t(data.placeholder) : undefined;
    const datalist = data?.datalist;

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
      <div
        class=${classMap({
          'input-group': true,
          'mb-2': true,
          'has-validation': isValidating || isTouchedInvalid,
        })}
      >
        <input
          type="text"
          spellcheck="false"
          class=${classMap({
            'form-control': true,
            'is-invalid': isTouchedInvalid,
            'is-valid': isTouchedValid,
          })}
          id=${id}
          list="tags-datalist"
          aria-describedby=${feedbackId}
          placeholder=${placeholder}
          .value=${helperValue ?? ''}
          @input=${(event) => setHelperValue(event.target.value)}
          @keydown=${this.handleKeydown}
        />
        <button
          class="btn btn-primary"
          type="button"
          ?disabled=${!this.canAddTag}
          @click=${this.addTag}
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
              <div id=${feedbackId} class="invalid-feedback">${t(error)}</div>
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
                  @click=${() => this.removeTag(tag)}
                ></button
              ></span>
            `,
        )}
      </div>
      ${datalist
        ? html`
            <datalist id="tags-datalist">
              ${datalist.map((item) => html`<option>${item}</option>`)}
            </datalist>
          `
        : nothing}
    `;
  }

  get canAddTag() {
    const { value, helperValue } = this.field;
    return (
      !validateRequired(helperValue) && !value.includes(helperValue.trim())
    );
  }

  addTag() {
    if (!this.canAddTag) return;
    const {
      value,
      helperValue,
      setTouched,
      setValue,
      setHelperValue,
    } = this.field;
    setTouched();
    setValue([...value, helperValue.trim()]);
    setHelperValue('');
  }

  removeTag(tag) {
    const { value, setTouched, setValue } = this.field;
    setTouched();
    setValue(value.filter((t) => t !== tag));
  }

  handleKeydown(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.addTag();
    }
  }
}

customElements.define('app-form-tags-field', AppFormTagsField);
