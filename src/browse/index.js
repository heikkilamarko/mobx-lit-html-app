import { Browse } from './Browse';
import { BrowseCard } from './BrowseCard';
import { Detail } from './Detail';
import { DetailCard } from './DetailCard';
import { BrowseStore } from './BrowseStore';

export function registerComponents() {
  customElements.define('app-browse', Browse);
  customElements.define('app-browse-card', BrowseCard);
  customElements.define('app-detail', Detail);
  customElements.define('app-detail-card', DetailCard);
}

export async function registerStores(stores) {
  const browseStore = new BrowseStore();
  Object.assign(stores, { browseStore });
}
