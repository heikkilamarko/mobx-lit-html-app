import { action, computed, makeObservable, observable } from 'mobx';

export default class FieldStore {
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
      id: observable.ref,
      value: observable.ref,
      helperValue: observable.ref,
      originalValue: observable.ref,
      error: observable.ref,
      isTouched: observable.ref,
      isValidating: observable.ref,
      data: observable.ref,
      isDirtyFn: observable.ref,
      isDirty: computed,
      isValid: computed,
      setField: action.bound,
      setId: action.bound,
      setValue: action.bound,
      resetValue: action.bound,
      setHelperValue: action.bound,
      setOriginalValue: action.bound,
      setError: action.bound,
      setTouched: action.bound,
      setValidating: action.bound,
      setData: action.bound,
      reset: action.bound,
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
