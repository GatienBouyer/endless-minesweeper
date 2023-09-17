import BoardMap from './grid_map';

// values: [[0 - 8]]
const MINE = 9;
const NOT_A_MINE = 10;
const MINE_HIDDEN = 11;
const FLAG_NOT_A_MINE = 12;
const FLAG_MINE_HIDDEN = 13;
const FLAG_UNDEFINED = 14;
// UNEXPLORED: undefined

class Minesweeper {
	#board: BoardMap
	listenersExpand: { (x: number, y: number): void }[]
	listenersClear: { (): void }[]
	difficulty: number /**< Between 0 and 1. 0 easy (no mines). 1 impossible (all mines). */
	status: "created" | "started" | "ended" = "created";
	flagCount: number = 0;
	revealCount: number = 0;

	constructor(difficulty: number) {
		this.difficulty = difficulty;
		this.#board = new BoardMap();
		this.listenersExpand = new Array();
		this.listenersClear = new Array();
	}

	get(x: number, y: number): number | undefined {
		return this.#board.get(x, y);
	}

	has(x: number, y: number): boolean {
		return this.#board.has(x, y);
	}

	static is_flag(cell_value: number | undefined): boolean {
		// @ts-ignore
		return cell_value >= FLAG_NOT_A_MINE;
	}

	isFlag(x: number, y: number): boolean {
		return Minesweeper.is_flag(this.#board.get(x, y));
	}

	static is_digit(cell_value: number | undefined): boolean {
		// @ts-ignore
		return 0 <= cell_value && cell_value <= 8;
	}

	isDigit(x: number, y: number): boolean {
		return Minesweeper.is_digit(this.#board.get(x, y));
	}

	static is_mine(cell_value: number | undefined): boolean {
		return cell_value == MINE;
	}

	isMine(x: number, y: number): boolean {
		return Minesweeper.is_mine(this.#board.get(x, y));
	}

	toggleFlag(x: number, y: number): void {
		const value = this.#board.get(x, y);
		if (value == FLAG_UNDEFINED) {
			this.flagCount -= 1;
			this.#board.unset(x, y);
		} else if (value == FLAG_MINE_HIDDEN) {
			this.flagCount -= 1;
			this.#board.set(x, y, MINE_HIDDEN);
		} else if (value == FLAG_NOT_A_MINE) {
			this.flagCount -= 1;
			this.#board.set(x, y, NOT_A_MINE);
		} else if (value == undefined) {
			this.flagCount += 1;
			this.#board.set(x, y, FLAG_UNDEFINED);
		} else if (value == MINE_HIDDEN) {
			this.flagCount += 1;
			this.#board.set(x, y, FLAG_MINE_HIDDEN);
		} else if (value == NOT_A_MINE) {
			this.flagCount += 1;
			this.#board.set(x, y, FLAG_NOT_A_MINE);
		}
	}

	#setMine(): typeof MINE_HIDDEN | typeof NOT_A_MINE {
		return (Math.random() < this.difficulty) ? MINE_HIDDEN : NOT_A_MINE;
	}

	revealCell(x: number, y: number): void {
		const value = this.#board.get(x, y);
		if (value == undefined) {
			if (this.status == "created") {
				this.#board.set(x, y, NOT_A_MINE);
			} else {
				this.#board.set(x, y, MINE_HIDDEN);
			}
			this.status = "started";
			this.notifyExpand(x, y);
			this.revealCell(x, y);
			return;
		}
		if (value == NOT_A_MINE) {
			this.#setNumber(x, y);
		} else if (value == MINE_HIDDEN) {
			this.#revealMines(x, y);
		}
	}

	#setNumber(x: number, y: number): void {
		let count = 0;
		this.#board.forNeighboors(x, y, (value, nx, ny) => {
			if (value == undefined) {
				const new_value = this.#setMine();
				this.#board.set(nx, ny, new_value);
				this.notifyExpand(nx, ny);
				if (new_value == MINE_HIDDEN) {
					count += 1;
				}
			} else if (value == FLAG_UNDEFINED) {
				if (this.#setMine() == MINE_HIDDEN) {
					this.#board.set(nx, ny, FLAG_MINE_HIDDEN);
					count += 1;
				} else {
					this.#board.set(nx, ny, FLAG_NOT_A_MINE);
				}
				this.notifyExpand(nx, ny);
			} else if (value == MINE_HIDDEN || value == FLAG_MINE_HIDDEN || value == MINE) {
				count += 1;
			}
		});
		this.#board.set(x, y, count);
		if (this.isFlag(x, y)) {
			this.flagCount -= 1;
		}
		this.revealCount += 1;
		if (count == 0) {
			this.#board.forNeighboors(x, y, (_, nx, ny) => this.revealCell(nx, ny));
		}
	}

	#revealMines(x: number, y: number): void {
		this.status = "ended";
		if (this.isFlag(x, y)) {
			this.flagCount -= 1;
		}
		this.#board.set(x, y, MINE);
		this.#board.forEachCell((value, x, y) => {
			if (value == FLAG_MINE_HIDDEN) {
				this.flagCount -= 1;
				this.#board.set(x, y, MINE);
			} else if (value == MINE_HIDDEN) {
				this.#board.set(x, y, MINE);
			}
		});
	}

	autoReveal(x: number, y: number): void {
		const value = this.#board.get(x, y);
		if (!Minesweeper.is_digit(value)) {
			return;
		}
		let count = 0;
		this.#board.forNeighboors(x, y, (value) => {
			if (Minesweeper.is_flag(value)) count += 1
		})
		if (count != value) {
			return;
		}
		this.#board.forNeighboors(x, y, (_, nx, ny) => this.revealCell(nx, ny));
	}

	notifyExpandForAllCell(): void {
		this.#board.forEachCell((_, x, y) => this.notifyExpand(x, y));
	}

	notifyExpand(x: number, y: number): void {
		for (const func of this.listenersExpand) {
			func(x, y)
		}
	}

	notifyClear(): void {
		for (const func of this.listenersClear) {
			func()
		}
	}

	start(): void {
		let n = 0;
		const MAX_TRY = 100;
		while (this.#board.get(0, 0) != 0 && n < MAX_TRY) {
			this.clean();
			this.revealCell(0, 0);
			n += 1;
		}
	}

	clean(): void {
		this.notifyClear();
		this.#board.clear();
		this.flagCount = 0;
		this.revealCount = 0;
		this.status = "created";
	}

	restart(): void {
		this.clean();
		this.start();
	}

	toJSON(): object {
		let grid = this.#board.toJSON();
		return {
			"flagCount": this.flagCount,
			"revealCount": this.revealCount,
			"difficulty": this.difficulty,
			"status": this.status,
			"grid": grid,
		};
	}

	fromJSON(value: unknown): boolean {
		if (!(typeof value == "object" && value
			&& "grid" in value
			&& "flagCount" in value && typeof value.flagCount == 'number'
			&& "revealCount" in value && typeof value.revealCount == 'number'
			&& "difficulty" in value && typeof value.difficulty == 'number'
			&& "status" in value && typeof value.status == 'string'
			&& (value.status == "created" || value.status == "started" || value.status == "ended")
		)) {
			return false;
		}
		if (!this.#board.fromJSON(value.grid)) {
			return false;
		};
		this.flagCount = value.flagCount;
		this.revealCount = value.revealCount;
		this.difficulty = value.difficulty;
		this.status = value.status;
		this.notifyClear();
		this.notifyExpandForAllCell();
		return true
	}
}

export default Minesweeper;
