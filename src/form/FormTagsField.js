import { html, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { action, computed, makeObservable, observable } from 'mobx';
import { stores } from '../shared/stores';
import { addRenderReaction, clearReactions } from '../shared/utils';
import { validateRequired } from './validators';

export class FormTagsField extends HTMLElement {
	options;

	constructor() {
		super();
		makeObservable(this, {
			options: observable.ref,
			canAddTag: computed,
			addTag: action.bound,
			removeTag: action.bound
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
			setHelperValue
		} = this.field;

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
							${label} ${isRequired ? html`<span class="text-danger">*</span>` : nothing}
						</label>
					`
				: nothing}
			<div
				class=${classMap({
					'input-group': true,
					'mb-2': true,
					'has-validation': isValidating || isTouchedInvalid
				})}
			>
				<input
					type="text"
					spellcheck="false"
					class=${classMap({
						'form-control': true,
						'is-invalid': isTouchedInvalid,
						'is-valid': isTouchedValid
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
					? html` <div id=${feedbackId} class="form-text">${t('form.validating')}</div> `
					: isTouchedInvalid
						? html` <div id=${feedbackId} class="invalid-feedback">${t(error)}</div> `
						: nothing}
			</div>
			<div>
				${value.map(
					(tag) => html`
						<span
							class="d-inline-flex flex-row align-items-center badge rounded-pill bg-primary mb-1 ps-3"
							>${tag}
							<button
								type="button"
								class="btn-close btn-close-white ms-2"
								aria-label=${t('close')}
								@click=${() => this.removeTag(tag)}
							></button
						></span>
					`
				)}
			</div>
			${this.options
				? html`
						<datalist id="tags-datalist">
							${this.options.map((option) => html`<option>${option}</option>`)}
						</datalist>
					`
				: nothing}
		`;
	}

	get canAddTag() {
		const { value, helperValue } = this.field;
		return !validateRequired(helperValue) && !value.includes(helperValue.trim());
	}

	addTag() {
		if (!this.canAddTag) return;
		const { value, helperValue, setTouched, setValue, setHelperValue } = this.field;
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
