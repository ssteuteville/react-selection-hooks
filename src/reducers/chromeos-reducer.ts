import {
  ReducerAction,
  SelectionApiState,
  UseSelectionApiReducerActions,
  UseSelectionDefaultActions,
} from "../types";

type ChromeosState<TITem> = SelectionApiState<TITem> & {
  pivotKey?: string | number;
};

const remove = <TItem>(
  state: ChromeosState<TItem>,
  action: ReducerAction<TItem, UseSelectionDefaultActions.remove>
): ChromeosState<TItem> => {
  const key = action.getKey(action.item);
  return {
    ...state,
    selectedItems: state.selectedItems.filter(
      (filterItem) => action.getKey(filterItem) !== key
    ),
  };
};

const append = <TItem>(
  state: ChromeosState<TItem>,
  action: ReducerAction<TItem, UseSelectionDefaultActions.append>
): ChromeosState<TItem> => {
  if (action.isSelected(action.item)) {
    return state;
  }
  return {
    ...state,
    selectedItems: state.selectedItems.concat(action.item),
  };
};

const toggle = <TItem>(
  state: ChromeosState<TItem>,
  action: ReducerAction<TItem, UseSelectionDefaultActions.toggle>
): ChromeosState<TItem> => {
  const isAlreadySelected = action.isSelected(action.item);
  return isAlreadySelected
    ? remove(state, { ...action, type: UseSelectionDefaultActions.remove })
    : append(state, { ...action, type: UseSelectionDefaultActions.append });
};

const chromeosReducer = <TItem>(
  state: ChromeosState<TItem>,
  action: UseSelectionApiReducerActions<TItem>
): ChromeosState<TItem> => {
  switch (action.type) {
    case UseSelectionDefaultActions.append: {
      return append(state, action);
    }
    case UseSelectionDefaultActions.remove: {
      return remove(state, action);
    }
    case UseSelectionDefaultActions.toggle: {
      return toggle(state, action);
    }
    case UseSelectionDefaultActions.clear: {
      return {
        ...state,
        selectedItems: [],
      };
    }
    case UseSelectionDefaultActions.mouse: {
      const pivotIndex = action.items.findIndex(
        (i) => action.getKey(i) === state.pivotKey
      );
      const { mouseEvent } = action;
      const key = action.getKey(action.item);
      const itemIndex = action.items.findIndex((i) => action.getKey(i) === key);
      if (
        state.pivotKey == null ||
        !mouseEvent ||
        (!mouseEvent.ctrlKey && !mouseEvent.shiftKey)
      ) {
        return {
          ...state,
          selectedItems: [action.item],
          pivotKey: key,
        };
      } else if (mouseEvent.shiftKey) {
        const startIndex = Math.min(itemIndex, pivotIndex);
        const endIndex = Math.max(itemIndex, pivotIndex);
        return {
          ...state,
          selectedItems: action.items.slice(startIndex, endIndex + 1),
        };
      } else if (mouseEvent.ctrlKey) {
        return {
          ...toggle(state, {
            ...action,
            type: UseSelectionDefaultActions.toggle,
          }),
          pivotKey: key,
        };
      }
    }
  }
};

export default chromeosReducer;
