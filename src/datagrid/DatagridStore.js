import { makeObservable, actionBound, computed, observableRef } from 'mobx';
import { getDatagrid } from '../shared/api';

export class DatagridStore {
	rows = [];
	isLoading = false;
	error = null;

	constructor() {
		makeObservable(this, {
			rows: observableRef,
			isLoading: observableRef,
			error: observableRef,
			hasError: computed,
			setRows: actionBound,
			setLoading: actionBound,
			setError: actionBound,
			load: actionBound
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
