import { writable, type Writable } from "svelte/store";

const STORAGE_KEY = "storyMode";

function loadMode(): boolean | null {
	const value = window.localStorage.getItem(STORAGE_KEY);
	if (value) {
		return JSON.parse(value);
	}
	return null;
}

function saveMode(mode: boolean): void {
	const value = JSON.stringify(mode);
	window.localStorage.setItem(STORAGE_KEY, value);
}

function createStore(): Writable<boolean> {
	const storedValue = loadMode();
	const initialValue = storedValue != null ? storedValue : true;
	const store = writable(initialValue);
	store.subscribe(value => saveMode(value));
	return store;
}

const storyMode = createStore();

export default storyMode;
