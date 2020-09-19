import axios from 'axios';

export async function getBrowseItems() {
  const { data } = await axios.get('/data/browse.json');
  return data;
}

export async function getWidgets() {
  const { data } = await axios.get('/data/widgets.json');
  return data;
}
