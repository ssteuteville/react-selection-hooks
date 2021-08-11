import { useCallback, useState, useMemo, MouseEvent } from "react";

export interface SelectionState<TItem> {
  [key: string]: TItem;
  [key: number]: TItem;
}

export type KeyGetter<TItem> = (item: TItem) => string | number;

export interface UseSelectionApi<TItem> {
  onSelect: (item: TItem, event?: MouseEvent) => void;
  selectionState: SelectionState<TItem>;
}
export interface UseSelectionOptions<TItem> {
  getKey: KeyGetter<TItem>;
}

export interface SelectionEvent<TItem> {
  mouseEvent?: MouseEvent;
  item: TItem;
}

const useSelection = <TItem>(
  items: TItem[],
  getKey: KeyGetter<TItem>
): UseSelectionApi<TItem> => {
  const [selectedItems, setSelection] = useState<TItem[]>([]);
  const [pivotKey, setPivotKey] = useState<string | number>();
  const pivotIndex = useMemo(
    () => items.findIndex((i) => getKey(i) === pivotKey),
    [items, getKey, pivotKey]
  );
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
      const isSelected = !!selection[key];
      const itemIndex = items.findIndex((i) => getKey(i) === getKey(item));
      if (pivotKey == null || !event || (!event.ctrlKey && !event.shiftKey)) {
        setSelection([item]);
        setPivotKey(key);
      } else if (event.shiftKey) {
        const startIndex = Math.min(itemIndex, pivotIndex);
        const endIndex = Math.max(itemIndex, pivotIndex);
        setSelection(items.slice(startIndex, endIndex + 1));
      } else if (event.ctrlKey && isSelected) {
        setSelection(selectedItems.filter((item) => getKey(item) !== key));
        setPivotKey(key);
      } else {
        setSelection(selectedItems.concat(item));
        setPivotKey(key);
      }
    },
    [selection, items, getKey, pivotKey]
  );

  return useMemo(
    () => ({
      onSelect: onSelectionEvent,
      selectionState: selection,
    }),
    [selection, onSelectionEvent]
  );
};

export default useSelection;
