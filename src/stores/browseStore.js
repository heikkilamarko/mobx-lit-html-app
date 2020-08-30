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

  async load(itemId = null) {
    try {
      this.selectedItemId = itemId;
      const { data } = await axios.get('/data.json');
      this.items = data;
    } catch (error) {
      this.error = error;
    }
  }
}

decorate(BrowseStore, {
  items: observable.ref,
  selectedItemId: observable.ref,
  error: observable.ref,
  selectedItem: computed,
  hasError: computed,
  load: action,
});

export default new BrowseStore();
