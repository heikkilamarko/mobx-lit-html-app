import { html } from 'lit-html';
import { stores } from '../stores';
import { addRenderReaction, clearReactions, preventDefault } from '../utils';
import './form/app-form-text-field';
import './form/app-form-tags-field';

class AppForm extends HTMLElement {
  connectedCallback() {
    addRenderReaction(this, () => {
      const { t } = stores.i18nStore;
      const {
        fields: { firstName, lastName, username, tags },
        canSubmit,
        canReset,
        submit,
        reset,
      } = stores.formStore;

      return html`
        <form autocomplete="off" @submit=${preventDefault(submit)}>
          <app-form-text-field .field=${firstName}></app-form-text-field>
          <app-form-text-field .field=${lastName}></app-form-text-field>
          <app-form-text-field .field=${username}></app-form-text-field>
          <app-form-tags-field .field=${tags}></app-form-tags-field>
          <div class="pt-3">
            <button
              type="submit"
              class="btn btn-primary"
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
