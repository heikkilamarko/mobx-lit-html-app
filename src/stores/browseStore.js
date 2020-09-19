import { makeObservable, action, computed, observable } from 'mobx';
import { getBrowseItems } from '../api';

class BrowseStore {
  items = [];
  selectedItemId = null;
  error = null;

  constructor() {
    makeObservable(this, {
      items: observable.ref,
      selectedItemId: observable.ref,
      error: observable.ref,
      selectedItem: computed,
      hasError: computed,
      setItems: action,
      setSelectedItemId: action,
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

  setError(error) {
    this.error = error;
  }

  async load(itemId = null) {
    try {
      this.setSelectedItemId(itemId);
      this.setError(null);
      const items = await getBrowseItems();
      this.setItems(items);
    } catch (error) {
      this.setError(error);
    }
  }
}

export default new BrowseStore();
