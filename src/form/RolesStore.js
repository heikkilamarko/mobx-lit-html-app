import { action, computed, makeObservable, observable, reaction } from 'mobx';
import { uniqueId } from 'lodash-es';
import { validateRequired } from './validators';
import { FieldStore } from './FieldStore';

export class RolesStore {
	fields = [];

	constructor() {
		makeObservable(this, {
			fields: observable.ref,
			value: computed,
			isDirty: computed,
			isValid: computed,
			isValidating: computed,
			addRole: action.bound,
			removeRole: action.bound,
			reset: action.bound,
			validate: action.bound
		});

		reaction(
			() => this.value,
			() => this.validate()
		);
	}

	get value() {
		return this.fields.map(({ value }) => value.trim());
	}

	get isDirty() {
		return !!this.fields.length;
	}

	get isValid() {
		return this.fields.every(({ isValid }) => isValid);
	}

	get isValidating() {
		return this.fields.some(({ isValidating }) => isValidating);
	}

	addRole() {
		this.fields = [
			...this.fields,
			new FieldStore({
				id: uniqueId('role_'),
				value: '',
				data: {
					label: 'form.roles.role',
					placeholder: 'form.roles.role',
					isRequired: true
				}
			})
		];
	}

	removeRole(field) {
		this.fields = this.fields.filter((f) => f !== field);
	}

	reset() {
		this.fields = [];
	}

	validate() {
		this.fields.forEach((field) => {
			let error = validateRequired(field.value);
			if (
				!error &&
				this.fields.some((f) => f !== field && f.value?.trim() === field.value?.trim())
			) {
				error = 'form.validation.duplicate';
			}
			field.setError(error);
		});
	}
}
