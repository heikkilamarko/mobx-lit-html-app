import { html, nothing } from 'lit-html';
import { stores } from '../shared/stores';
import { addRenderReaction, clearReactions } from '../shared/utils';

export class Jokes extends HTMLElement {
  connectedCallback() {
    addRenderReaction(this);

    stores.jokesStore.getJokeCategories();
  }

  disconnectedCallback() {
    clearReactions(this);
  }

  render() {
    const { t } = stores.i18nStore;
    const {
      setCategory,
      getJoke,
      isReady,
      isLoading,
      categories,
      category,
      jokeText,
    } = stores.jokesStore;

    return isReady
      ? html`
          <div class="mx-auto">
            <div class="input-group mt-3 mb-5">
              <select
                class="form-select form-select-lg"
                aria-label="Joke select"
                .value=${category}
                @change="${(event) => setCategory(event.target.value)}"
              >
                <option value="">${t('jokes.select.all')}</option>
                ${categories.map(
                  (c) =>
                    html`
                      <option .value=${c} ?selected=${c === category}>
                        ${c}
                      </option>
                    `,
                )}
              </select>
              <button
                class="btn btn-primary"
                type="button"
                ?disabled=${isLoading}
                @click=${() => getJoke()}
              >
                ${t('jokes.tell')}
              </button>
            </div>
            <app-joke .text=${jokeText}></app-joke>
          </div>
        `
      : nothing;
  }
}
