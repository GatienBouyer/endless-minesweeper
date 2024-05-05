export const NEIGHBOORS = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
];

export default class GridMap {
    #map: Map<string, number>;

    constructor() {
        this.#map = new Map();
    }

    get(x: number, y: number): number | undefined {
        return this.#map.get(`${x}|${y}`);
    }

    set(x: number, y: number, value: number): void {
        this.#map.set(`${x}|${y}`, value);
    }

    unset(x: number, y: number): void {
        this.#map.delete(`${x}|${y}`);
    }

    has(x: number, y: number): boolean {
        return this.#map.has(`${x}|${y}`);
    }

    forEachCell(callbackfn: (value: number, x: number, y: number) => void): void {
        this.#map.forEach((value, key) => {
            const xy = key.split("|");
            const x = parseInt(xy[0]);
            const y = parseInt(xy[1]);
            callbackfn(value, x, y);
        });
    }

    forNeighboors(
        x: number,
        y: number,
        callbackfn: (value: number | undefined, x: number, y: number) => void,
    ): void {
        for (const delta of NEIGHBOORS) {
            const nx = x + delta[0];
            const ny = y + delta[1];
            const value = this.#map.get(`${nx}|${ny}`);
            callbackfn(value, nx, ny);
        }
    }

    clear(): void {
        this.#map.clear();
    }

    toJSON(): object {
        const array = Array.from(this.#map, ([name, value]) => [name, value]);
        return array;
    }

    fromJSON(value: unknown): boolean {
        if (!Array.isArray(value)) {
            return false;
        }
        this.#map.clear();
        this.#map = new Map(value);
        return true;
    }
}
