import { action, computed, makeObservable, observable } from 'mobx';
import { getJoke, getJokeCategories } from '../shared/api';

const CATEGORY_ALL = '';

export class JokesStore {
  categories = [];
  category = null;
  joke = null;
  isLoading = false;
  error = null;

  constructor() {
    makeObservable(this, {
      categories: observable.ref,
      category: observable.ref,
      joke: observable.ref,
      isLoading: observable.ref,
      error: observable.ref,
      isReady: computed,
      jokeText: computed,
      hasError: computed,
      setCategories: action.bound,
      setCategory: action.bound,
      setJoke: action.bound,
      setLoading: action.bound,
      setError: action.bound,
      getJokeCategories: action.bound,
      getJoke: action.bound,
    });
  }

  get isReady() {
    return !!this.categories?.length;
  }

  get jokeText() {
    return this.joke?.value ?? null;
  }

  get hasError() {
    return !!this.error;
  }

  setCategories(categories) {
    this.categories = categories;
    this.setCategory(CATEGORY_ALL);
  }

  setCategory(category) {
    this.category = category;
    this.getJoke();
  }

  setJoke(joke) {
    this.joke = joke;
  }

  setLoading(isLoading) {
    this.isLoading = isLoading;
  }

  setError(error) {
    this.error = error;
  }

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
