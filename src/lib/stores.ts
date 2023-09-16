import Game from './minesweeper/Game';
import { difficulty_levels } from './minesweeper/difficulties';
import { writable } from 'svelte/store';

const STORAGE_KEY = "game";

function loadGame(game: Game): void {
	const value = window.localStorage.getItem(STORAGE_KEY);
	if (value) {
		game.fromJSON(JSON.parse(value));
	}
}

function saveGame(game: Game): void {
	const value = JSON.stringify(game.toJSON());
	window.localStorage.setItem(STORAGE_KEY, value);
}

function createGameStores() {
	const game = new Game(difficulty_levels[2].value);
	loadGame(game);
	const gameSt = writable(game);
	const difficultySt = writable(game.difficulty);
	return {
		difficulty: {
			subscribe: difficultySt.subscribe,
			set: (d: number) => {
				difficultySt.set(d);
				gameSt.update((g) => { g.difficulty = d; g.restart(); return g })
			},
		},
		game: {
			subscribe: gameSt.subscribe,
			// "return g" is to tricker an update
			revealCell: (x: number, y: number) => gameSt.update((g) => {
				g.revealCell(x, y);
				saveGame(g);
				return g
			}),
			toggleFlag: (x: number, y: number) => gameSt.update((g) => {
				g.toggleFlag(x, y);
				saveGame(g);
				return g
			}),
			autoReveal: (x: number, y: number) => gameSt.update((g) => {
				g.autoReveal(x, y);
				saveGame(g);
				return g
			}),
			start: () => gameSt.update((g) => {
				g.start();
				return g
			}),
			restart: () => gameSt.update((g) => {
				g.restart();
				return g
			}),
		},
	}
}

export const { difficulty, game } = createGameStores();

