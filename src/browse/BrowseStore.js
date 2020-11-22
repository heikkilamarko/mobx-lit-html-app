import { makeObservable, action, computed, observable } from 'mobx';
import { getBrowseItems } from '../shared/api';

export class BrowseStore {
  items = [];
  selectedItemId = null;
  isLoading = false;
  error = null;

  constructor() {
    makeObservable(this, {
      items: observable.ref,
      selectedItemId: observable.ref,
      isLoading: observable.ref,
      error: observable.ref,
      selectedItem: computed,
      hasError: computed,
      setItems: action.bound,
      setSelectedItemId: action.bound,
      setLoading: action.bound,
      setError: action.bound,
      load: action.bound,
    });
  }

  get selectedItem() {
    return this.items.find((item) => item.id === this.selectedItemId);
  }

  get hasError() {
    return !!this.error;
  }

  setItems(items) {
    this.items = items;
  }

  setSelectedItemId(itemId) {
    this.selectedItemId = itemId;
  }

  setLoading(isLoading) {
    this.isLoading = isLoading;
  }

  setError(error) {
    this.error = error;
  }

  async load(itemId = null) {
    try {
      this.setError(null);
      this.setLoading(true);
      this.setSelectedItemId(itemId);
      const items = await getBrowseItems();
      this.setLoading(false);
      this.setItems(items);
    } catch (error) {
      this.setError(error);
    } finally {
      this.setLoading(false);
    }
  }
}
