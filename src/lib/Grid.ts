export const NEIGHBOORS = [
	[-1, -1],
	[-1, 0],
	[-1, 1],
	[0, -1],
	[0, 1],
	[1, -1],
	[1, 0],
	[1, 1],
]

class Grid {
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
		NEIGHBOORS.forEach(delta => {
			const nx = x + delta[0]; const ny = y + delta[1];
			if (!(0 <= nx && nx < this.size && 0 <= ny && ny < this.size)) {
				return;
			}
			callbackfn(this.#array[nx][ny], nx, ny);
		})
	}
}

export default Grid;
