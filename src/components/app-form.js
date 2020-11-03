import { html } from 'lit-html';
import { repeat } from 'lit-html/directives/repeat';
import { stores } from '../stores';
import { addRenderReaction, clearReactions, preventDefault } from '../utils';
import './form/app-form-text-field';
import './form/app-form-tags-field';
import './form/app-form-role-field';
import './app-form.css';

class AppForm extends HTMLElement {
  connectedCallback() {
    addRenderReaction(this, () => {
      const { t } = stores.i18nStore;
      const {
        fields: { firstName, lastName, age, username, tags, roles },
        isSubmitting,
        canSubmit,
        canReset,
        submit,
        reset,
      } = stores.formStore;

      return html`
        <form autocomplete="off" @submit=${preventDefault(submit)}>
          <app-form-text-field .field=${firstName}></app-form-text-field>
          <app-form-text-field .field=${lastName}></app-form-text-field>
          <app-form-text-field .field=${age}></app-form-text-field>
          <app-form-text-field .field=${username}></app-form-text-field>
          <app-form-tags-field .field=${tags}></app-form-tags-field>
          <div>
            ${repeat(
              roles.roles,
              (role) => role.id,
              (role) =>
                html`
                  <app-form-role-field
                    .field=${role}
                    @remove=${() => roles.removeRole(role)}
                  ></app-form-role-field>
                `,
            )}
          </div>
          <div class="d-flex flex-row justify-content-between mt-5">
            <button
              type="button"
              class="btn btn-primary"
              ?disabled=${isSubmitting}
              @click=${roles.addRole}
            >
              ${t('form.roles.add')}
            </button>
            <div>
              <button
                type="button"
                class="btn btn-outline-primary"
                ?disabled=${!canReset}
                @click=${reset}
              >
                ${t('form.reset')}
              </button>
              <button
                type="submit"
                class="btn btn-primary ml-2"
                ?disabled=${!canSubmit}
              >
                ${t('form.submit')}
              </button>
            </div>
          </div>
        </form>
      `;
    });
  }

  disconnectedCallback() {
    clearReactions(this);
  }
}

customElements.define('app-form', AppForm);
