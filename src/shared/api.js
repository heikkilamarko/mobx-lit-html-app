import axios from 'axios';

export async function getConfig() {
	const { data } = await axios.get('/config.json');
	return data;
}

export async function getLocales() {
	const { data } = await axios.get('/data/locales.json');
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
	const { data } = await axios.get('https://api.chucknorris.io/jokes/categories');
	return data;
}

export async function getJoke(category) {
	let url = 'https://api.chucknorris.io/jokes/random';

	if (category) {
		url += `?category=${encodeURIComponent(category)}`;
	}

	const { data } = await axios.get(url);
	return data;
}

export async function getDatagrid() {
	const { data } = await axios.get('/data/datagrid.json');
	return data;
}
