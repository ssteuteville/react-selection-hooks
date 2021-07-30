import {useCallback, useState} from "react";

export interface SelectionState<TItem> {
    [key: string]: TItem;
    [key: number]: TItem;
}

export type KeyGetter<TItem> = (item: TItem) => string | number;

export type UseSelectionResult<TItem> = [(item: TItem) => void, SelectionState<TItem>];

const useSelection = <TItem>(items: TItem, getKey: KeyGetter<TItem>): UseSelectionResult<TItem> => {
    const [selection, setSelection] = useState<SelectionState<TItem>>();

    const onSelectToggle = useCallback((item: TItem) => {
        const key = getKey(item);
        const newState = { ...selection };
        if (selection[key]) {
            delete newState[key];
        } else {
            newState[key] = item;
        }

        setSelection(newState);
    }, [selection]);

    return [onSelectToggle, selection];
};

export default useSelection;