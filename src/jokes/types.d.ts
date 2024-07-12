export interface Joke {
	value: string;
}

export interface JokesStore {
	categories: string[];
	category: string;
	joke: Joke;
	error: Error;
	jokeText: string;
	hasError: boolean;
	isLoading: boolean;
	isReady: boolean;

	setCategory: (category: string) => void;
	getJoke: () => void;
}
