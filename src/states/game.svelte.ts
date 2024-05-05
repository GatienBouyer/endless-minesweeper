import Minesweeper from "$lib/minesweeper/minesweeper";
import { difficulty_levels } from "$lib/minesweeper/difficulties";
import StoredElement from "$lib/local_storage";

export const gameStorage = new StoredElement("game");

export const game = new Minesweeper(difficulty_levels[2].value);

game.fromJSON(gameStorage.load());
