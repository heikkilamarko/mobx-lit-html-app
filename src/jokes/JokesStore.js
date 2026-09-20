import { actionBound, computed, makeObservable, observableRef } from 'mobx';
import { getJoke, getJokeCategories } from '../shared/api';

/**
 * @typedef { import("./types").JokesStore } IJokesStore
 * @typedef { import("./types").Joke } Joke
 */

const CATEGORY_ALL = '';

/**
 * @implements {IJokesStore}
 */
export class JokesStore {
	/** @type {string[]} */
	categories = [];
	/** @type {string} */
	category = null;
	/** @type {Joke} */
	joke = null;
	/** @type {boolean} */
	isLoading = false;
	/** @type {Error} */
	error = null;

	constructor() {
		makeObservable(this, {
			categories: observableRef,
			category: observableRef,
			joke: observableRef,
			isLoading: observableRef,
			error: observableRef,
			isReady: computed,
			jokeText: computed,
			hasError: computed,
			setCategories: actionBound,
			setCategory: actionBound,
			setJoke: actionBound,
			setLoading: actionBound,
			setError: actionBound,
			getJokeCategories: actionBound,
			getJoke: actionBound
		});
	}

	/**
	 * Is ready state.
	 */
	get isReady() {
		return !!this.categories?.length;
	}

	/**
	 * Joke text.
	 */
	get jokeText() {
		return this.joke?.value ?? null;
	}

	/**
	 * Has error state.
	 */
	get hasError() {
		return !!this.error;
	}

	/**
	 * Set categories.
	 * @param {string[]} categories
	 */
	setCategories(categories) {
		this.categories = categories;
		this.setCategory(CATEGORY_ALL);
	}

	/**
	 * Set category.
	 * @param {string} category
	 */
	setCategory(category) {
		this.category = category;
		this.getJoke();
	}

	/**
	 * Set joke.
	 * @param {Joke} joke
	 */
	setJoke(joke) {
		this.joke = joke;
	}

	/**
	 * Set loading state.
	 * @param {boolean} isLoading
	 */
	setLoading(isLoading) {
		this.isLoading = isLoading;
	}

	/**
	 * Set error.
	 * @param {Error} error
	 */
	setError(error) {
		this.error = error;
	}

	/**
	 * Get joke categories.
	 */
	async getJokeCategories() {
		if (this.isReady) return;

		try {
			this.setError(null);
			this.setLoading(true);
			const categories = await getJokeCategories();
			this.setLoading(false);
			this.setCategories(categories);
		} catch (error) {
			this.setError(error);
		} finally {
			this.setLoading(false);
		}
	}

	/**
	 * Get joke.
	 */
	async getJoke() {
		if (this.isLoading) return;

		try {
			this.setError(null);
			this.setLoading(true);
			const joke = await getJoke(this.category);
			this.setLoading(false);
			this.setJoke(joke);
		} catch (error) {
			this.setError(error);
		} finally {
			this.setLoading(false);
		}
	}
}
