import { makeObservable, action, computed, observable } from 'mobx';
import { getBrowseItems } from '../api';

export default class BrowseStore {
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
      setItems: action,
      setSelectedItemId: action,
      setLoading: action,
      setError: action,
      load: action,
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
      this.setLoading(true);
      this.setError(null);
      this.setSelectedItemId(itemId);
      const items = await getBrowseItems();
      this.setItems(items);
    } catch (error) {
      this.setError(error);
    } finally {
      this.setLoading(false);
    }
  }
}
