import axios from 'axios';

export async function getResources() {
  const { data } = await axios.get('/data/resources.json');
  return data;
}

export async function getBrowseItems() {
  const { data } = await axios.get('/data/browse.json');
  return data;
}

export async function getWidgets() {
  const { data } = await axios.get('/data/widgets.json');
  return data;
}

export async function getJokeCategories() {
  const { data } = await axios.get(
    'https://api.chucknorris.io/jokes/categories',
  );
  return data;
}

export async function getJoke(category) {
  let url = 'https://api.chucknorris.io/jokes/random';

  if (category) {
    url += `?category=${category}`;
  }

  const { data } = await axios.get(url);
  return data;
}
