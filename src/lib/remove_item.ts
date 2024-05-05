export default function removeItem<T>(array: T[], item: T): void {
    const itemIndex = array.indexOf(item);
    if (itemIndex != -1) {
        array.splice(itemIndex, 1);
    }
}
