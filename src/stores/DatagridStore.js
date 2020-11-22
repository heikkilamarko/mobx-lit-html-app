import { makeObservable, action, computed, observable } from 'mobx';
import { getDatagrid } from '../shared/api';

export default class DatagridStore {
  rows = [];
  isLoading = false;
  error = null;

  constructor() {
    makeObservable(this, {
      rows: observable.ref,
      isLoading: observable.ref,
      error: observable.ref,
      hasError: computed,
      setRows: action.bound,
      setLoading: action.bound,
      setError: action.bound,
      load: action.bound,
    });
  }

  get hasError() {
    return !!this.error;
  }

  setRows(rows) {
    this.rows = rows;
  }

  setLoading(isLoading) {
    this.isLoading = isLoading;
  }

  setError(error) {
    this.error = error;
  }

  async load() {
    try {
      this.setError(null);
      this.setLoading(true);
      const rows = await getDatagrid();
      this.setLoading(false);
      this.setRows(rows);
    } catch (error) {
      this.setError(error);
    } finally {
      this.setLoading(false);
    }
  }
}
