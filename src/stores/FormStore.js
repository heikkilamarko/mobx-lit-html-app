import { action, computed, makeObservable, observable, reaction } from 'mobx';
import { debounce, isEqual } from 'lodash-es';
import { sleep } from '../utils';
import { FormField } from './form';

const USERNAME_DEBOUNCE_WAIT = 1000;

export default class FormStore {
  fields;

  constructor(stores) {
    Object.assign(this, stores);

    makeObservable(this, {
      fields: observable.ref,
      name: computed,
      username: computed,
      tags: computed,
      all: computed,
      isDirty: computed,
      isValid: computed,
      isValidating: computed,
      canSubmit: computed,
      canReset: computed,
      reset: action.bound,
      submit: action.bound,
    });

    this.fields = {
      firstName: new FormField({
        id: 'firstname',
        value: '',
        data: {
          label: 'form.firstname',
          placeholder: 'form.firstname',
          isRequired: true,
        },
      }),
      lastName: new FormField({
        id: 'lastname',
        value: '',
        data: {
          label: 'form.lastname',
          placeholder: 'form.lastname',
          isRequired: true,
        },
      }),
      username: new FormField({
        id: 'username',
        value: '',
        data: {
          label: 'form.username',
          placeholder: 'form.username',
          isRequired: true,
        },
      }),
      tags: new FormField({
        id: 'tags',
        value: [],
        data: {
          label: 'form.tags',
          placeholder: 'form.tags.tag',
        },
        isDirtyFn: (a, b) => !isEqual(a, b),
      }),
    };

    reaction(
      () => this.name,
      (name) => {
        this.fields.firstName.setError(validateRequired(name.firstName));
        this.fields.lastName.setError(validateRequired(name.lastName));
      },
      { fireImmediately: true },
    );

    reaction(
      () => this.username,
      (username) => {
        const error = validateRequired(username);
        if (error) {
          this.fields.username.setError(error);
        } else {
          this.fields.username.setValidating(true);
        }
      },
      { fireImmediately: true },
    );

    reaction(
      () => this.username,
      debounce(async (username) => {
        if (username) {
          this.fields.username.setError(await validateUsername(username));
        }
        this.fields.username.setValidating(false);
      }, USERNAME_DEBOUNCE_WAIT),
      { fireImmediately: true },
    );

    reaction(
      () => this.tags,
      (tags) => {
        this.fields.tags.setError(validateTags(tags));
      },
      { fireImmediately: true },
    );
  }

  get name() {
    return {
      firstName: this.fields.firstName.value,
      lastName: this.fields.lastName.value,
    };
  }

  get username() {
    return this.fields.username.value;
  }

  get tags() {
    return this.fields.tags.value;
  }

  get all() {
    return {
      ...this.name,
      username: this.username,
      tags: [...this.tags],
    };
  }

  get isDirty() {
    return (
      this.fields.firstName.isDirty ||
      this.fields.lastName.isDirty ||
      this.fields.username.isDirty ||
      this.fields.tags.isDirty
    );
  }

  get isValid() {
    return (
      this.fields.firstName.isValid &&
      this.fields.lastName.isValid &&
      this.fields.username.isValid &&
      this.fields.tags.isValid
    );
  }

  get isValidating() {
    return (
      this.fields.firstName.isValidating ||
      this.fields.lastName.isValidating ||
      this.fields.username.isValidating ||
      this.fields.tags.isValidating
    );
  }

  get canSubmit() {
    return this.isValid && !this.isValidating;
  }

  get canReset() {
    return this.isDirty && !this.isValidating;
  }

  reset() {
    this.fields.firstName.reset();
    this.fields.lastName.reset();
    this.fields.username.reset();
    this.fields.tags.reset();
  }

  async submit() {
    if (!this.canSubmit) return;

    const body = { ...this.all, tags: this.tags.join(', ') };

    await sleep(500); // Simulate async work.

    const { t } = this.i18nStore;

    this.toastStore.showSuccess({
      title: t('form.submitted.title'),
      body: t('form.submitted.body', body),
    });

    this.reset();
  }
}

function validateRequired(value) {
  return value ? null : 'form.validation.required';
}

async function validateUsername(username) {
  await sleep(500); // Simulate async work.

  return username === 'demo' ? 'form.validation.taken' : null;
}

function validateTags(tags) {
  return tags?.length ? null : 'form.tags.validation.required';
}
