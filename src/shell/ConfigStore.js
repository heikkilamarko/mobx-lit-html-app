import { makeObservable, action, observable } from 'mobx';
import { getConfig } from '../shared/api';

export class ConfigStore {
	/** @type {import("./types").Config} */
	config;

	constructor() {
		makeObservable(this, {
			config: observable.ref,
			setConfig: action.bound,
			load: action.bound,
			loadProd: action.bound,
			loadDev: action.bound
		});
	}

	setConfig(config) {
		this.config = config;
	}

	async load() {
		// @ts-ignore
		import.meta.env.DEV ? this.loadDev() : await this.loadProd();
	}

	async loadProd() {
		try {
			const config = await getConfig();
			this.setConfig(config);
		} catch (error) {
			console.log('config loading failed');
		}
	}

	loadDev() {
		try {
			this.setConfig({
				// @ts-ignore
				gitHubUrl: import.meta.env.VITE_PUBLIC_GITHUB_URL
			});
		} catch (e) {
			console.log('config loading failed');
		}
	}
}
