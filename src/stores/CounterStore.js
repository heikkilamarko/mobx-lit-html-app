import { makeObservable, action, observable, computed } from 'mobx';

export default class CounterStore {
  minValue = -10;
  maxValue = 10;

  value = 0;

  constructor() {
    makeObservable(this, {
      value: observable,
      progress: computed,
      setValue: action.bound,
      increment: action.bound,
      decrement: action.bound,
      reset: action.bound,
    });
  }

  get progress() {
    return (
      (100 * (this.value + this.maxValue)) / (this.maxValue - this.minValue)
    );
  }

  setValue(value) {
    this.value =
      value < this.minValue
        ? this.minValue
        : this.maxValue < value
        ? this.maxValue
        : value;
  }

  increment() {
    this.setValue(this.value + 1);
  }

  decrement() {
    this.setValue(this.value - 1);
  }

  reset() {
    this.value = 0;
  }
}
