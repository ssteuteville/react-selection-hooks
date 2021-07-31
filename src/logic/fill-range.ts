import findLastIndex from "../utils/findLastIndex";

const fillRange = <TItem>(
    items: TItem[],
    selection: SelectionState<TItem>,
    event: SelectionEvent<TItem>,
    getKey: KeyGetter<TItem> | undefined = undefined
) => {
    const firstSelectedItemIndex = items.findIndex(item => selection[getKey(item)] != null);
    const lastSelectedItemIndex = firstSelectedItemIndex === -1
        ? -1
        : findLastIndex(items, (item => selection[getKey(item)] != null));
    const itemIndex = items.findIndex(item => getKey(item) == getKey(event.item));
    if (event.mouseEvent.shiftKey) {
        if (firstSelectedItemIndex < itemIndex) {
            return items.slice(Math.max(firstSelectedItemIndex, 0), itemIndex);
        } else {
            return items.slice(firstSelectedItemIndex, Math.min(items.length - 1, lastSelectedItemIndex));
        }
    }
};

export default fillRange;