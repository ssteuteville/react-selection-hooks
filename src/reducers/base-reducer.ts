import { MouseEvent } from "react";
import {
  ReducerAction,
  SelectionApiState,
  UseSelectionApiReducerActions,
  UseSelectionDefaultActions,
} from "../types";

const baseReducer = <TItem, TState extends SelectionApiState<TItem>>(
  state: TState,
  action: UseSelectionApiReducerActions<TItem>
): TState => {
  const remove = (
    state: TState,
    action: ReducerAction<TItem, UseSelectionDefaultActions.remove>
  ): TState => {
    const key = action.getKey(action.item);
    return {
      ...state,
      selectedItems: state.selectedItems.filter(
        (filterItem) => action.getKey(filterItem) !== key
      ),
    };
  };

  const append = (
    state: TState,
    action: ReducerAction<TItem, UseSelectionDefaultActions.append>
  ): TState => {
    if (action.isSelected(action.item)) {
      return state;
    }
    return {
      ...state,
      selectedItems: state.selectedItems.concat(action.item),
    };
  };

  const toggle = (
    state: TState,
    action: ReducerAction<
      TItem,
      UseSelectionDefaultActions.toggle | UseSelectionDefaultActions.mouse
    > & { mouseEvent?: MouseEvent }
  ): TState => {
    const isAlreadySelected = action.isSelected(action.item);
    return isAlreadySelected
      ? remove(state, { ...action, type: UseSelectionDefaultActions.remove })
      : append(state, { ...action, type: UseSelectionDefaultActions.append });
  };

  switch (action.type) {
    case UseSelectionDefaultActions.append: {
      return append(state, action);
    }
    case UseSelectionDefaultActions.remove: {
      return remove(state, action);
    }
    case UseSelectionDefaultActions.mouse:
    case UseSelectionDefaultActions.toggle: {
      return toggle(state, action);
    }
    case UseSelectionDefaultActions.clear: {
      return {
        ...state,
        selectedItems: [],
      };
    }
    default:
      return state;
  }
};

export default baseReducer;
