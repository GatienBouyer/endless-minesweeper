import Game from './minesweeper/Game';

import { get, writable } from 'svelte/store';


function createGameStores() {
	const size = writable(7);
	const difficulty = writable(0.2);
	const game = writable(new Game(get(size), get(difficulty)));
	return {
		size: {
			subscribe: size.subscribe,
			set: (s: number) => { size.set(s); game.set(new Game(s, get(difficulty))); },
		},
		difficulty: {
			subscribe: difficulty.subscribe,
			set: (d: number) => { difficulty.set(d); get(game).difficulty = d; }
		},
		game: {
			subscribe: game.subscribe,
			// "return g" is to tricker an update
			revealCell: (x: number, y: number) => game.update((g) => { g.revealCell(x, y); return g }),
			toggleFlag: (x: number, y: number) => game.update((g) => { g.toggleFlag(x, y); return g }),
			autoReveal: (x: number, y: number) => game.update((g) => { g.autoReveal(x, y); return g }),
		},
	}
}

export const { difficulty, game, size } = createGameStores();

