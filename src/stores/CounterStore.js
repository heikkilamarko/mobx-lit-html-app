import { makeObservable, action, observable } from 'mobx';

export default class CounterStore {
  value = 0;

  constructor() {
    makeObservable(this, {
      value: observable,
      setValue: action.bound,
      increment: action.bound,
      decrement: action.bound,
      reset: action.bound,
    });
  }

  setValue(value) {
    this.value = value;
  }

  increment() {
    this.value++;
  }

  decrement() {
    this.value--;
  }

  reset() {
    this.value = 0;
  }
}
