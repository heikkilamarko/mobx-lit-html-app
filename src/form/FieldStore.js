import { actionBound, computed, makeObservable, observableRef } from 'mobx';

export class FieldStore {
	id = null;
	value = null;
	helperValue = null;
	originalValue = null;
	error = null;
	isTouched = false;
	isValidating = false;
	data = null;
	isDirtyFn = defaultIsDirtyFn;

	constructor(field) {
		makeObservable(this, {
			id: observableRef,
			value: observableRef,
			helperValue: observableRef,
			originalValue: observableRef,
			error: observableRef,
			isTouched: observableRef,
			isValidating: observableRef,
			data: observableRef,
			isDirtyFn: observableRef,
			isDirty: computed,
			isValid: computed,
			setField: actionBound,
			setId: actionBound,
			setValue: actionBound,
			resetValue: actionBound,
			setHelperValue: actionBound,
			setOriginalValue: actionBound,
			setError: actionBound,
			setTouched: actionBound,
			setValidating: actionBound,
			setData: actionBound,
			reset: actionBound
		});

		this.setField(field);
	}

	get isDirty() {
		return this.isDirtyFn(this.value, this.originalValue);
	}

	get isValid() {
		return !this.error;
	}

	setField(field) {
		Object.assign(this, field);
		this.originalValue ??= field.value;
	}

	setId(id) {
		this.id = id;
	}

	setValue(value) {
		this.value = value;
	}

	resetValue() {
		this.setValue(this.originalValue);
	}

	setHelperValue(helperValue) {
		this.helperValue = helperValue;
	}

	setOriginalValue(originalValue) {
		this.originalValue = originalValue;
	}

	setError(error) {
		this.error = error;
	}

	setTouched(isTouched = true) {
		this.isTouched = isTouched;
	}

	setValidating(isValidating) {
		this.isValidating = isValidating;
	}

	setData(data) {
		this.data = data;
	}

	reset() {
		this.resetValue();
		this.setHelperValue(null);
		this.setError(null);
		this.setTouched(false);
		this.setValidating(false);
	}
}

function defaultIsDirtyFn(a, b) {
	return a !== b;
}
