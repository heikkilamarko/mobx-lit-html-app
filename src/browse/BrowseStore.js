import { makeObservable, actionBound, computed, observableRef } from 'mobx';
import { getBrowseItems } from '../shared/api';

export class BrowseStore {
	/** @type {import("./types").BrowseItem[]} */
	items = [];
	/** @type {string} */
	selectedItemId = null;
	/** @type {boolean} */
	isLoading = false;
	/** @type {Error} */
	error = null;

	constructor() {
		makeObservable(this, {
			items: observableRef,
			selectedItemId: observableRef,
			isLoading: observableRef,
			error: observableRef,
			selectedItem: computed,
			hasError: computed,
			setItems: actionBound,
			setSelectedItemId: actionBound,
			setLoading: actionBound,
			setError: actionBound,
			load: actionBound
		});
	}

	get selectedItem() {
		return this.items.find((item) => item.id === this.selectedItemId);
	}

	get hasError() {
		return !!this.error;
	}

	/**
	 * Set items.
	 * @param {import("./types").BrowseItem[]} items
	 */
	setItems(items) {
		this.items = items;
	}

	/**
	 * Set selected item id.
	 * @param {string} itemId
	 */
	setSelectedItemId(itemId) {
		this.selectedItemId = itemId;
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
	 * Load items.
	 * @param {string=} itemId
	 */
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
