import StoredElement from "$lib/local_storage";

const storyModeStorage = new StoredElement<boolean>("storyMode");

function createStoryModeState() {
    const storedValue = storyModeStorage.load();
    const initialValue = storedValue != null ? storedValue : true;
    let state = $state(initialValue);
    return {
        get isActive() {
            return state;
        },
        set isActive(v: boolean) {
            storyModeStorage.save(v);
            state = v;
        },
    };
}

const storyMode = createStoryModeState();

export default storyMode;
