import Game from './Game';

import { get, writable } from 'svelte/store';


function createGameStores() {
	const size = writable(7);
	const difficulty = writable(.2);
	const game = writable(new Game(get(size), get(difficulty)));
	return {
		size: {
			subscribe: size.subscribe,
			set: (/** @type {number} */ s) => { size.set(s); game.set(new Game(s, get(difficulty))); },
		},
		difficulty: {
			subscribe: difficulty.subscribe,
			set: (/** @type {number} */ d) => { difficulty.set(d); get(game).difficulty = d; }
		},
		game: {
			subscribe: game.subscribe,
			// "return g" is to tricker an update
			revealCell: (/** @type {number} */ x, /** @type {number} */ y) => game.update((g) => { g.revealCell(x, y); return g }),
			toggleFlag: (/** @type {number} */ x, /** @type {number} */ y) => game.update((g) => { g.toggleFlag(x, y); return g }),
			autoReveal: (/** @type {number} */ x, /** @type {number} */ y) => game.update((g) => { g.autoReveal(x, y); return g }),
		},
	}
}

export const { difficulty, game, size } = createGameStores();

