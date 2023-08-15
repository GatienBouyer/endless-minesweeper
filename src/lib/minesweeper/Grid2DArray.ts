import { NEIGHBOORS } from "./constants";

class Grid2DArray {
	#array: number[][];
	size: number;

	constructor(size: number) {
		this.size = size;
		this.#array = Array.from(new Array(size), () => new Array(size));
	}

	get(x: number, y: number): number | undefined {
		return this.#array.at(x)?.at(y);
	}

	set(x: number, y: number, value: number): void {
		this.#array[x][y] = value;
	}

	unset(x: number, y: number): void {
		delete this.#array[x][y];
	}

	forEachCell(callbackfn: (value: number, x: number, y: number) => void): void {
		this.#array.forEach((column, x) => {
			column.forEach((value, y) => {
				callbackfn(value, x, y);
			})
		});
	}

	forNeighboors(x: number, y: number, callbackfn: (value: number, x: number, y: number) => void): void {
		for (const delta of NEIGHBOORS) {
			const nx = x + delta[0]; const ny = y + delta[1];
			if (!(0 <= nx && nx < this.size && 0 <= ny && ny < this.size)) {
				continue;
			}
			callbackfn(this.#array[nx][ny], nx, ny);
		}
	}
}

export default Grid2DArray;
