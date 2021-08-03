import { useCallback, useState, useMemo } from "react";
import fillRange from "./logic/fill-range";

export interface SelectionState<TItem> {
  [key: string]: TItem;
  [key: number]: TItem;
}

export type KeyGetter<TItem> = (item: TItem) => string | number;

export type UseSelectionResult<TItem> = [
  (item: TItem, event?: MouseEvent) => void,
  SelectionState<TItem>
];

export interface UseSelectionOptions<TItem> {
  getKey: KeyGetter<TItem>;
}

export interface SelectionEvent<TItem> {
  mouseEvent?: MouseEvent;
  item: TItem;
}

// const defaultSelector = <TItem>(
//     items: TItem[],
//     selection: SelectionState<TItem>,
//     event: SelectionEvent<TItem>,
//     getKey: KeyGetter<TItem> | undefined = undefined
// ): TItem[] => {
//     const firstSelectedItemIndex = items.findIndex(item => selection[getKey(item)] != null);
//     const lastSelectedItemIndex = firstSelectedItemIndex === -1
//         ? -1
//         : findLastIndex(items, (item => selection[getKey(item)] != null));
//     const itemIndex = items.findIndex(item => getKey(item) == getKey(event.item));
//     if (event.mouseEvent.shiftKey) {
//         if (firstSelectedItemIndex < itemIndex) {
//             return items.slice(Math.max(firstSelectedItemIndex, 0), itemIndex);
//         } else {
//             return items.slice(firstSelectedItemIndex, Math.min(items.length - 1, lastSelectedItemIndex));
//         }
//     }
// }

const useSelection = <TItem>(
  items: TItem[],
  getKey: KeyGetter<TItem>
): UseSelectionResult<TItem> => {
  const [selectedItems, setSelection] = useState<TItem[]>([]);
  const selection: SelectionState<TItem> = useMemo(
    () =>
      Object.assign(
        {},
        ...selectedItems.map((item) => ({ [getKey(item)]: item }))
      ),
    [selectedItems]
  );

  const onSelectionEvent = useCallback(
    (item: TItem, event: MouseEvent | undefined = undefined) => {
      const key = getKey(item);
      if (!event || (!event.ctrlKey && !event.shiftKey)) {
        if (selection[key]) {
          setSelection(selectedItems.filter((item) => getKey(item) !== key));
        } else {
          setSelection(selectedItems.concat(item));
        }
      } else if (event.shiftKey) {
        setSelection(fillRange(item, items, selection, getKey));
      }
    },
    [selection, items, getKey]
  );

  return [onSelectionEvent, selection];
};

export default useSelection;
