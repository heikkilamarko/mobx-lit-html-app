import { action, computed, makeObservable, observable, reaction } from 'mobx';
import { uniqueId } from 'lodash-es';
import { validateRequired } from '../../validators';
import FieldStore from './FieldStore';

export default class RolesStore {
  roles = [];

  constructor() {
    makeObservable(this, {
      roles: observable.ref,
      value: computed,
      isDirty: computed,
      isValid: computed,
      isValidating: computed,
      addRole: action.bound,
      removeRole: action.bound,
      reset: action.bound,
      validate: action.bound,
    });

    reaction(
      () => this.value,
      () => this.validate(),
    );
  }

  get value() {
    return this.roles.map((role) => role.value.trim());
  }

  get isDirty() {
    return !!this.roles.length;
  }

  get isValid() {
    return this.roles.every((role) => role.isValid);
  }

  get isValidating() {
    return this.roles.some((role) => role.isValidating);
  }

  addRole() {
    this.roles = [
      ...this.roles,
      new FieldStore({
        id: uniqueId('role_'),
        value: '',
        data: {
          label: 'form.roles.role',
          placeholder: 'form.roles.role',
          isRequired: true,
        },
      }),
    ];
  }

  removeRole(role) {
    this.roles = this.roles.filter((r) => r !== role);
  }

  reset() {
    this.roles = [];
  }

  validate() {
    this.roles.forEach((role) => {
      let error = validateRequired(role.value);
      if (
        !error &&
        this.roles.some(
          (r) => r !== role && r.value?.trim() === role.value?.trim(),
        )
      ) {
        error = 'form.validation.duplicate';
      }
      role.setError(error);
    });
  }
}
