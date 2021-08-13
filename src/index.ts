import { useCallback, useMemo, MouseEvent, useReducer } from "react";
import chromeosReducer from "./reducers/chromeos-reducer";
import {
  UseSelectionApi,
  SelectionState,
  UseSelectionOptions,
  UseSelectionDefaultActions,
} from "./types";

const useSelection = <TItem>(
  items: TItem[],
  {
    getKey,
    reducer = chromeosReducer,
    defaultState = { selectedItems: [] },
  }: UseSelectionOptions<TItem>
): UseSelectionApi<TItem> => {
  const [{ selectedItems }, dispatch] = useReducer(reducer, defaultState);

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
      dispatch({
        type: UseSelectionDefaultActions.append,
        isSelected,
        item,
        getKey,
        items,
      });
    },
    [isSelected, getKey, items]
  );

  const removeFromSelection = useCallback(
    (item: TItem) => {
      dispatch({
        type: UseSelectionDefaultActions.remove,
        isSelected,
        item,
        getKey,
        items,
      });
    },
    [isSelected, getKey, items]
  );

  const toggleSelection = useCallback(
    (item: TItem) => {
      dispatch({
        type: UseSelectionDefaultActions.toggle,
        isSelected,
        item,
        getKey,
        items,
      });
    },
    [isSelected, getKey, items]
  );

  const onSelectionEvent = useCallback(
    (item: TItem, event: MouseEvent | undefined = undefined) => {
      dispatch({
        type: UseSelectionDefaultActions.mouse,
        getKey,
        isSelected,
        item,
        mouseEvent: event,
        items,
      });
    },
    [getKey, isSelected, items]
  );

  const clearSelection = useCallback(() => {
    dispatch({ type: UseSelectionDefaultActions.clear });
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
