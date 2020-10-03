import { html, nothing } from 'lit-html';
import { stores } from '../stores';
import { addRenderReaction, clearReactions } from '../utils';
import './app-joke';
import './app-jokes.css';

class AppJokes extends HTMLElement {
  connectedCallback() {
    const { t } = stores.i18nStore;

    stores.jokesStore.getJokeCategories();

    addRenderReaction(this, () =>
      stores.jokesStore.isReady
        ? html`
            <div class="mx-auto app-jokes">
              <div class="input-group mb-3">
                <select
                  class="form-select form-select-lg"
                  aria-label="Joke select"
                  .value=${stores.jokesStore.category ?? ''}
                  @change="${(event) => this.handleCategoryChange(event)}"
                >
                  <option value="">${t('jokes.select.all')}</option>
                  ${stores.jokesStore.categories.map(
                    (c) =>
                      html`
                        <option
                          .value=${c}
                          ?selected=${c === stores.jokesStore.category}
                        >
                          ${c}
                        </option>
                      `,
                  )}
                </select>
                <button
                  class="btn btn-primary"
                  type="button"
                  @click=${() => this.handleGetJoke()}
                >
                  ${t('jokes.get')}
                </button>
              </div>
              <app-joke .text=${stores.jokesStore.jokeText}></app-joke>
            </div>
          `
        : nothing,
    );
  }

  disconnectedCallback() {
    clearReactions(this);
  }

  handleCategoryChange(event) {
    stores.jokesStore.setCategory(event.target.value);
  }

  handleGetJoke() {
    stores.jokesStore.getJoke();
  }
}

customElements.define('app-jokes', AppJokes);
