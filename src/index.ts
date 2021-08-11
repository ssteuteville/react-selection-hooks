import { useCallback, useState, useMemo, MouseEvent } from "react";

export interface SelectionState<TItem> {
  [key: string]: TItem;
  [key: number]: TItem;
}

export type KeyGetter<TItem> = (item: TItem) => string | number;

export interface UseSelectionApi<TItem> {
  onSelect: (item: TItem, event?: MouseEvent) => void;
  selectionCount: number;
  clearSelection: () => void;
  appendToSelection: (item: TItem) => void;
  removeFromSelection: (item: TItem) => void;
  isSelected: (item: TItem) => boolean;
  toggleSelection: (item: TItem) => void;
  selectedItems: TItem[];
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

  const isSelected = useCallback(
    (item: TItem) => !!selection[getKey(item)],
    [getKey, selection]
  );

  const appendToSelection = useCallback(
    (item: TItem) => {
      if (!isSelected(item)) {
        setSelection((current) => current.concat(item));
      }
    },
    [isSelected]
  );

  const removeFromSelection = useCallback(
    (item: TItem) => {
      if (!isSelected(item)) return;

      const key = getKey(item);
      setSelection((current) =>
        current.filter((filterItem) => getKey(filterItem) !== key)
      );
    },
    [isSelected, getKey]
  );

  const toggleSelection = useCallback(
    (item: TItem) => {
      if (isSelected(item)) {
        removeFromSelection(item);
      } else {
        appendToSelection(item);
      }
    },
    [isSelected, appendToSelection, removeFromSelection]
  );

  const onSelectionEvent = useCallback(
    (item: TItem, event: MouseEvent | undefined = undefined) => {
      const key = getKey(item);
      const itemIndex = items.findIndex((i) => getKey(i) === getKey(item));
      if (pivotKey == null || !event || (!event.ctrlKey && !event.shiftKey)) {
        setSelection([item]);
        setPivotKey(key);
      } else if (event.shiftKey) {
        const startIndex = Math.min(itemIndex, pivotIndex);
        const endIndex = Math.max(itemIndex, pivotIndex);
        setSelection(items.slice(startIndex, endIndex + 1));
      } else if (event.ctrlKey) {
        toggleSelection(item);
      }
    },
    [items, getKey, pivotKey, toggleSelection]
  );

  const clearSelection = useCallback(() => {
    setSelection([]);
  }, []);

  return useMemo(
    () => ({
      appendToSelection,
      removeFromSelection,
      toggleSelection,
      isSelected,
      onSelect: onSelectionEvent,
      selectedItems,
      selectionCount: selectedItems.length,
      clearSelection,
    }),
    [
      clearSelection,
      isSelected,
      selectedItems,
      appendToSelection,
      removeFromSelection,
      toggleSelection,
      onSelectionEvent,
    ]
  );
};

export default useSelection;
