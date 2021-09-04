import { useCallback, useMemo, MouseEvent, useReducer } from "react";
import pivotReducer from "./reducers/pivot-reducer";
import {
  UseSelectionApi,
  SelectionState,
  UseSelectionOptions,
  UseSelectionDefaultActions,
  SelectionApiState,
  PivotReducerState,
} from "./types";

const useSelection = <
  TItem,
  TState extends SelectionApiState<TItem> = PivotReducerState<TItem>
>(
  items: TItem[],
  {
    getKey,
    reducer = pivotReducer,
    defaultState = { selectedItems: [] },
  }: UseSelectionOptions<TItem>
): UseSelectionApi<TItem, TState> => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const { selectedItems } = state;

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

  const selectAll = useCallback(() => {
    dispatch({
      type: UseSelectionDefaultActions.all,
      items,
    });
  }, [items]);

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
      selectAll,
      selectedItems,
      selectionCount: selectedItems.length,
      clearSelection,
      state: state as TState,
    }),
    [
      clearSelection,
      isSelected,
      selectedItems,
      appendToSelection,
      selectAll,
      removeFromSelection,
      toggleSelection,
      onSelectionEvent,
      state,
    ]
  );
};

export default useSelection;
