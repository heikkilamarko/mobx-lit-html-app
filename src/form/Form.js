import { html } from 'lit-html';
import { repeat } from 'lit-html/directives/repeat';
import { stores } from '../shared/stores';
import {
  addRenderReaction,
  clearReactions,
  preventDefault,
} from '../shared/utils';
import './Form.css';

export class Form extends HTMLElement {
  connectedCallback() {
    addRenderReaction(this);
  }

  disconnectedCallback() {
    clearReactions(this);
  }

  render() {
    const { t } = stores.i18nStore;
    const {
      fields: { firstName, lastName, age, username, tags, roles },
      tagsOptions,
      isSubmitting,
      canSubmit,
      canReset,
      submit,
      reset,
    } = stores.formStore;

    return html`
      <form autocomplete="off" @submit=${preventDefault(submit)}>
        <fieldset ?disabled=${isSubmitting}>
          <app-form-text-field .field=${firstName}></app-form-text-field>
          <app-form-text-field .field=${lastName}></app-form-text-field>
          <app-form-text-field .field=${age}></app-form-text-field>
          <app-form-text-field .field=${username}></app-form-text-field>
          <app-form-tags-field
            .field=${tags}
            .options=${tagsOptions}
          ></app-form-tags-field>
          ${repeat(
            roles.fields,
            (field) => field.id,
            (field) =>
              html`
                <app-form-role-field
                  .field=${field}
                  @remove=${() => roles.removeRole(field)}
                ></app-form-role-field>
              `,
          )}
        </fieldset>
        <div class="d-flex flex-row flex-wrap justify-content-between mt-4">
          <button
            type="button"
            class="btn btn-primary rounded-pill mt-2"
            ?disabled=${isSubmitting}
            @click=${roles.addRole}
          >
            ${t('form.roles.add')}
          </button>
          <div>
            <button
              type="button"
              class="btn btn-outline-primary rounded-pill me-2 mt-2"
              ?disabled=${!canReset}
              @click=${reset}
            >
              ${t('form.reset')}
            </button>
            <button
              type="submit"
              class="btn btn-primary rounded-pill mt-2"
              ?disabled=${!canSubmit}
            >
              ${t('form.submit')}
            </button>
          </div>
        </div>
      </form>
    `;
  }
}
