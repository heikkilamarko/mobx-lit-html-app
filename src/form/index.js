import { Form } from './Form.js';
import { FormTextField } from './FormTextField';
import { FormTagsField } from './FormTagsField';
import { FormRoleField } from './FormRoleField';
import { FormStore } from './FormStore';

export function registerComponents() {
  customElements.define('app-form', Form);
  customElements.define('app-form-text-field', FormTextField);
  customElements.define('app-form-tags-field', FormTagsField);
  customElements.define('app-form-role-field', FormRoleField);
}

export async function registerStores(stores) {
  const { i18nStore, toastStore } = stores;
  const formStore = new FormStore({ i18nStore, toastStore });
  Object.assign(stores, { formStore });
}
