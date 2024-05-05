export default class StoredElement<T> {
    key: string;

    constructor(key: string) {
        this.key = key;
    }

    load(): T | null {
        const value = window.localStorage.getItem(this.key);
        if (value) {
            return JSON.parse(value);
        }
        return null;
    }

    save(value: T): void {
        const stringifiedValue = JSON.stringify(value);
        window.localStorage.setItem(this.key, stringifiedValue);
    }
}
