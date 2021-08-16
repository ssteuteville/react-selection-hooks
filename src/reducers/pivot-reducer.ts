import {
  SelectionApiState,
  UseSelectionApiReducerActions,
  UseSelectionDefaultActions,
} from "../types";
import baseReducer from "./base-reducer";

type PivotReducerState<TITem> = SelectionApiState<TITem> & {
  pivotKey?: string | number;
};

const pivotReducer = <TItem>(
  state: PivotReducerState<TItem>,
  action: UseSelectionApiReducerActions<TItem>
): PivotReducerState<TItem> => {
  switch (action.type) {
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
          ...baseReducer(state, {
            ...action,
            type: UseSelectionDefaultActions.toggle,
          }),
          pivotKey: key,
        };
      }
      return state;
    }
    default: {
      return baseReducer(state, action);
    }
  }
};

export default pivotReducer;
