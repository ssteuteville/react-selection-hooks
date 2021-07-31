import {useCallback, useState, useReducer, useMemo} from "react";

const findLastIndex = <T>(array: Array<T>, predicate: (value: T, index: number, obj: T[]) => boolean): number => {
    let l = array.length;
    while (l--) {
        if (predicate(array[l], l, array))
            return l;
    }
    return -1;
}

export interface SelectionState<TItem> {
    [key: string]: TItem;
    [key: number]: TItem;
}

export type KeyGetter<TItem> = (item: TItem) => string | number;

export type UseSelectionResult<TItem> = [(item: TItem) => void, SelectionState<TItem>];

export interface UseSelectionOptions<TItem> {
    getKey: KeyGetter<TItem>;
}

export interface SelectionEvent<TItem> {
    mouseEvent?: MouseEvent;
    item: TItem;
}

const defaultSelector = <TItem>(
    items: TItem[],
    selection: SelectionState<TItem>,
    event: SelectionEvent<TItem>,
    getKey: KeyGetter<TItem> | undefined = undefined
): TItem[] => {
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
}

const useSelection = <TItem>(getKey: KeyGetter<TItem>): UseSelectionResult<TItem> => {

    const reducer = useReducer();
    const [selectedItems, setSelection] = useState<TItem[]>([]);
    const selection: SelectionState<TItem> = useMemo(
        () => Object.assign({}, ...selectedItems.map(item => ({ [getKey(item)]: item }))),
        [selectedItems]
    )

    const onSelectToggle = useCallback((item: TItem) => {
        const key = getKey(item);
        const newState = [...selectedItems];
        if (selection[key]) {
            setSelection(selectedItems.filter(item => getKey(item) !== key));
        } else {
            setSelection(selectedItems.concat(item));
        }

        setSelection(newState);
    }, [selection]);

    return [onSelectToggle, selection];
};

export default useSelection;