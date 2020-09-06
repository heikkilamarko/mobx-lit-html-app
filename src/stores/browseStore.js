import { action, computed, decorate, observable } from 'mobx';
import axios from 'axios';

class BrowseStore {
  constructor() {
    this.items = [];
    this.selectedItemId = null;
    this.error = null;
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
      const { data } = await axios.get('/data.json');
      this.setItems(data);
    } catch (error) {
      this.setError(error);
    }
  }
}

decorate(BrowseStore, {
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

export default new BrowseStore();
