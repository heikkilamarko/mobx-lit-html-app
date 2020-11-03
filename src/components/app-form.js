import { html } from 'lit-html';
import { repeat } from 'lit-html/directives/repeat';
import { stores } from '../stores';
import { addRenderReaction, clearReactions, preventDefault } from '../utils';
import './form/app-form-text-field';
import './form/app-form-tags-field';
import './form/app-form-role-field';

class AppForm extends HTMLElement {
  connectedCallback() {
    addRenderReaction(this, () => {
      const { t } = stores.i18nStore;
      const {
        fields: { firstName, lastName, age, username, tags, roles },
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
          <div class="pt-3">
            <button
              type="button"
              class="btn btn-primary"
              @click=${roles.addRole}
            >
              ${t('form.roles.add')}
            </button>
            <button
              type="submit"
              class="btn btn-primary ml-3"
              ?disabled=${!canSubmit}
            >
              ${t('form.submit')}
            </button>
            <button
              type="button"
              class="btn btn-outline-primary ml-3"
              ?disabled=${!canReset}
              @click=${reset}
            >
              ${t('form.reset')}
            </button>
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
