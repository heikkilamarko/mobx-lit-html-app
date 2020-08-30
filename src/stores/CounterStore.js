import { action, decorate, observable } from 'mobx';

class CounterStore {
  constructor() {
    this.value = 0;
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

decorate(CounterStore, {
  value: observable,
  increment: action,
  decrement: action,
  reset: action,
});

export default CounterStore;
