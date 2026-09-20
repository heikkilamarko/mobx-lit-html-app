import { makeObservable, actionBound, observableRef, computed } from 'mobx';

export class CounterStore {
	minValue = -10;
	maxValue = 10;

	value = 0;

	constructor() {
		makeObservable(this, {
			value: observableRef,
			progress: computed,
			setValue: actionBound,
			increment: actionBound,
			decrement: actionBound,
			reset: actionBound
		});
	}

	get progress() {
		return (100 * (this.value + this.maxValue)) / (this.maxValue - this.minValue);
	}

	setValue(value) {
		this.value =
			value < this.minValue ? this.minValue : this.maxValue < value ? this.maxValue : value;
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
