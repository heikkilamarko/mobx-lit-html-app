import { action, computed, makeObservable, observable, reaction } from 'mobx';
import { debounce } from 'lodash-es';
import { FormField } from './form';
import { sleep } from '../utils';

const USERNAME_DEBOUNCE_WAIT = 1000;

export default class FormStore {
  fields;
  isValidatingUsername = false;

  constructor() {
    makeObservable(this, {
      fields: observable.ref,
      isValidatingUsername: observable.ref,
      name: computed,
      username: computed,
      all: computed,
      isDirty: computed,
      isInvalid: computed,
      canSubmit: computed,
      canReset: computed,
      setValidatingUsername: action.bound,
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
          this.setValidatingUsername(true);
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
        this.setValidatingUsername(false);
      }, USERNAME_DEBOUNCE_WAIT),
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

  get all() {
    return {
      ...this.name,
      username: this.username,
    };
  }

  get isDirty() {
    return (
      this.fields.firstName.isDirty ||
      this.fields.lastName.isDirty ||
      this.fields.username.isDirty
    );
  }

  get isInvalid() {
    return (
      this.fields.firstName.isInvalid ||
      this.fields.lastName.isInvalid ||
      this.fields.username.isInvalid
    );
  }

  get canSubmit() {
    return !this.isInvalid && !this.isValidatingUsername;
  }

  get canReset() {
    return this.isDirty && !this.isValidatingUsername;
  }

  setValidatingUsername(isValidating) {
    this.isValidatingUsername = isValidating;
  }

  reset() {
    this.fields.firstName.reset();
    this.fields.lastName.reset();
    this.fields.username.reset();
  }

  submit() {
    if (!this.canSubmit) return;
    alert(JSON.stringify(this.all, null, 2));
    this.reset();
  }
}

function validateRequired(value) {
  return value ? null : 'form.validation.required';
}

async function validateUsername(username) {
  await sleep(500);
  return username === 'demo' ? 'form.validation.taken' : null;
}
