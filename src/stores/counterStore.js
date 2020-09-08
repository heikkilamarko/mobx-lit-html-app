import { makeObservable, action, observable } from 'mobx';

class CounterStore {
  value = 0;

  constructor() {
    makeObservable(this, {
      value: observable,
      increment: action,
      decrement: action,
      reset: action,
    });
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

export default new CounterStore();
