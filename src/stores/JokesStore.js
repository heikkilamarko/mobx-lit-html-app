import { action, computed, makeObservable, observable } from 'mobx';
import { getJoke, getJokeCategories } from '../api';

const CATEGORY_ALL = '';

class JokesStore {
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
      setCategories: action,
      setCategory: action,
      setJoke: action,
      setLoading: action,
      setError: action,
      getJokeCategories: action,
      getJoke: action,
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
      this.setLoading(true);
      this.setError(null);
      const categories = await getJokeCategories();
      this.setCategories(categories);
      this.getJoke(categories[0]);
    } catch (error) {
      this.setError(error);
    } finally {
      this.setLoading(false);
    }
  }

  async getJoke() {
    try {
      this.setLoading(true);
      this.setError(null);
      const joke = await getJoke(this.category);
      this.setJoke(joke);
    } catch (error) {
      this.setError(error);
    } finally {
      this.setLoading(false);
    }
  }
}

export default JokesStore;
