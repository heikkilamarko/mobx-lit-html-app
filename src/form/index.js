import { Form } from './Form.js';
import { FormTextField } from './FormTextField';
import { FormTagsField } from './FormTagsField';
import { FormRoleField } from './FormRoleField';
import { FormStore } from './FormStore';
import moduleLocales from './locales.json';

export function registerComponents() {
	customElements.define('app-form', Form);
	customElements.define('app-form-text-field', FormTextField);
	customElements.define('app-form-tags-field', FormTagsField);
	customElements.define('app-form-role-field', FormRoleField);
}

export async function registerStores(stores) {
	const formStore = new FormStore();
	Object.assign(stores, { formStore });
}

export async function registerLocales(locales) {
	Object.assign((locales.en ??= {}), moduleLocales.en);
	Object.assign((locales.fi ??= {}), moduleLocales.fi);
}
