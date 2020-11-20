import { action, computed, makeObservable, observable, reaction } from 'mobx';
import { debounce, isEqual } from 'lodash-es';
import {
  validateRequired,
  validateAge,
  validateUsername,
  validateTags,
} from '../validators';
import { sleep } from '../utils';
import { FieldStore, RolesStore } from './form';

const DEBOUNCE_WAIT = 800;

const TAGS_DATALIST = ['demo', 'dev', 'staging', 'prod'];

export default class FormStore {
  fields;
  isValidatingUsername = false;
  isSubmitting = false;

  constructor(stores) {
    Object.assign(this, stores);

    makeObservable(this, {
      fields: observable.ref,
      isValidatingUsername: observable.ref,
      isSubmitting: observable.ref,
      nameAndAge: computed,
      username: computed,
      tags: computed,
      tagsOptions: computed,
      isDirty: computed,
      isValid: computed,
      isValidating: computed,
      canSubmit: computed,
      canReset: computed,
      reset: action.bound,
      submit: action.bound,
      validate: action.bound,
      validateNameAndAge: action.bound,
      validateUsername: action.bound,
      validateTags: action.bound,
      validateRoles: action.bound,
    });

    this.fields = {
      firstName: new FieldStore({
        id: 'firstname',
        value: '',
        data: {
          label: 'form.firstname',
          placeholder: 'form.firstname',
          isRequired: true,
        },
      }),
      lastName: new FieldStore({
        id: 'lastname',
        value: '',
        data: {
          label: 'form.lastname',
          placeholder: 'form.lastname',
          isRequired: true,
        },
      }),
      age: new FieldStore({
        id: 'age',
        value: '',
        data: {
          label: 'form.age',
          placeholder: 'form.age',
          isRequired: true,
        },
      }),
      username: new FieldStore({
        id: 'username',
        value: '',
        data: {
          label: 'form.username',
          placeholder: 'form.username',
          isRequired: true,
          isTouchDisabled: true,
        },
      }),
      tags: new FieldStore({
        id: 'tags',
        value: [],
        data: {
          label: 'form.tags',
          placeholder: 'form.tags.tag',
          isRequired: true,
        },
        isDirtyFn: (a, b) => !isEqual(a, b),
      }),
      roles: new RolesStore(),
    };

    reaction(
      () => this.nameAndAge,
      () => this.validateNameAndAge(),
    );

    reaction(
      () => this.username,
      () => (this.isValidatingUsername = true),
    );

    reaction(
      () => this.username,
      debounce(() => this.validateUsername(), DEBOUNCE_WAIT),
    );

    reaction(
      () => this.tags,
      () => this.validateTags(),
    );

    this.validate();
  }

  get nameAndAge() {
    return {
      firstName: this.fields.firstName.value,
      lastName: this.fields.lastName.value,
      age: this.fields.age.value,
    };
  }

  get username() {
    return this.fields.username.value;
  }

  get tags() {
    return this.fields.tags.value;
  }

  get tagsOptions() {
    const tags = this.tags;
    return TAGS_DATALIST.filter((tag) => !tags.includes(tag));
  }

  get isDirty() {
    return Object.values(this.fields).some((f) => f.isDirty);
  }

  get isValid() {
    return Object.values(this.fields).every((f) => f.isValid);
  }

  get isValidating() {
    return (
      this.isValidatingUsername ||
      Object.values(this.fields).some((f) => f.isValidating)
    );
  }

  get canSubmit() {
    return this.isValid && !this.isValidating && !this.isSubmitting;
  }

  get canReset() {
    return this.isDirty && !this.isValidating && !this.isSubmitting;
  }

  reset() {
    Object.values(this.fields).forEach((f) => f.reset());
    this.validate();
  }

  validate() {
    this.validateNameAndAge();
    this.validateUsername();
    this.validateTags();
    this.validateRoles();
  }

  validateNameAndAge() {
    const { firstName, lastName, age } = this.fields;
    firstName.setError(validateRequired(firstName.value));
    lastName.setError(validateRequired(lastName.value));
    age.setError(validateAge(age.value));
  }

  async validateUsername() {
    const { username } = this.fields;
    const error = validateRequired(username.value);
    if (error) {
      username.setError(error);
    } else {
      username.setValidating(true);
      username.setError(await validateUsername(username.value));
      username.setValidating(false);
      username.setTouched(true);
    }
    this.isValidatingUsername = false;
  }

  validateTags() {
    const { tags } = this.fields;
    tags.setError(validateTags(tags.value));
  }

  validateRoles() {
    this.fields.roles.validate();
  }

  async submit() {
    if (!this.canSubmit) return;

    const { t } = this.i18nStore;

    this.isSubmitting = true;

    try {
      const formData = {
        firstName: this.fields.firstName.value.trim(),
        lastName: this.fields.lastName.value.trim(),
        username: this.fields.username.value.trim(),
        age: Number(this.fields.age.value),
        tags: this.fields.tags.value.join(', '),
        roles: this.fields.roles.value.join(', '),
      };

      this.toastStore.show({
        title: t('form.submit.submitting.title'),
        body: t('form.submit.submitting.body'),
      });

      await sleep(2000); // Simulate async work.

      this.toastStore.showSuccess({
        title: t('form.submit.success.title'),
        body: t('form.submit.success.body', formData),
        delay: 5000,
      });

      this.reset();
    } catch (error) {
      console.log(error);
      this.toastStore.showError({
        title: t('form.submit.error.title'),
        body: t('form.submit.error.body'),
      });
    } finally {
      this.isSubmitting = false;
    }
  }
}
