import { action, computed, makeObservable, observable } from 'mobx';

export default class FormField {
  id = null;
  value = null;
  originalValue = null;
  error = null;
  isTouched = false;
  data = null;

  constructor(field) {
    makeObservable(this, {
      id: observable.ref,
      value: observable.ref,
      originalValue: observable.ref,
      error: observable.ref,
      isTouched: observable.ref,
      data: observable.ref,
      isDirty: computed,
      isInvalid: computed,
      isInvalidTouched: computed,
      isValid: computed,
      setField: action.bound,
      setId: action.bound,
      setData: action.bound,
      setTouched: action.bound,
      setValue: action.bound,
      resetValue: action.bound,
      setError: action.bound,
      clearError: action.bound,
      reset: action.bound,
    });

    this.setField(field);
  }

  get isDirty() {
    return this.value !== this.originalValue;
  }

  get isInvalid() {
    return !!this.error;
  }

  get isInvalidTouched() {
    return this.isTouched && this.isInvalid;
  }

  get isValid() {
    return !this.isInvalid;
  }

  setField(field) {
    Object.assign(this, field);
    this.originalValue ??= field.value;
  }

  setId(id) {
    this.id = id;
  }

  setData(data) {
    this.data = data;
  }

  setTouched(isTouched = true) {
    this.isTouched = isTouched;
  }

  setValue(value) {
    this.value = value;
  }

  resetValue() {
    this.setValue(this.originalValue);
  }

  setError(error) {
    this.error = error;
  }

  clearError() {
    this.setError(null);
  }

  reset() {
    this.resetValue();
    this.clearError();
    this.setTouched(false);
  }
}
