import {
  PivotReducerState,
  UseSelectionApiReducerActions,
  UseSelectionDefaultActions,
} from "../types";
import isMacOs from "../utils/is-mac-os";
import baseReducer from "./base-reducer";

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
      const toggleModifer =
        mouseEvent && (isMacOs() ? mouseEvent.metaKey : mouseEvent.ctrlKey);

      if (
        state.pivotKey == null ||
        !mouseEvent ||
        (!toggleModifer && !mouseEvent.shiftKey)
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
      } else if (toggleModifer) {
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
    case UseSelectionDefaultActions.clear: {
      return {
        ...baseReducer(state, action),
        pivotKey: undefined,
      };
    }
    case UseSelectionDefaultActions.append: {
      return {
        ...baseReducer(state, action),
        pivotKey: action.getKey(action.item),
      };
    }
    default: {
      return baseReducer(state, action);
    }
  }
};

export default pivotReducer;
