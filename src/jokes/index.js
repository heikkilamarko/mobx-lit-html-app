import { Jokes } from './Jokes';
import { Joke } from './Joke';
import { JokesStore } from './JokesStore';

export function registerComponents() {
  customElements.define('app-jokes', Jokes);
  customElements.define('app-joke', Joke);
}

export async function registerStores(stores) {
  const jokesStore = new JokesStore();
  Object.assign(stores, { jokesStore });
}
