import { MouseEvent } from "react";

export interface SelectionState<TItem> {
  [key: string]: TItem;
  [key: number]: TItem;
}

export type KeyGetter<TItem> = (item: TItem) => string | number;

export interface SelectionApiState<TItem> {
  selectedItems: TItem[];
}

export interface ReducerAction<TItem, Type extends string> {
  type: Type;
  item: TItem;
  getKey: (item: TItem) => string | number;
  isSelected: (item: TItem) => boolean;
  items: TItem[];
}

export enum UseSelectionDefaultActions {
  mouse = "mouse-selection",
  clear = "clear-selection",
  append = "append-selection",
  remove = "remove-selection",
  toggle = "toggle-Selection",
}

export type UseSelectionApiReducerActions<TItem> =
  | (ReducerAction<TItem, UseSelectionDefaultActions.mouse> & {
      mouseEvent: MouseEvent;
    })
  | { type: UseSelectionDefaultActions.clear }
  | ReducerAction<TItem, UseSelectionDefaultActions.append>
  | ReducerAction<TItem, UseSelectionDefaultActions.remove>
  | ReducerAction<TItem, UseSelectionDefaultActions.toggle>;

export type UseSelectionApiReducer<TItem> = (
  state: SelectionApiState<TItem>,
  action: UseSelectionApiReducerActions<TItem>
) => SelectionApiState<TItem>;

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
  reducer?: UseSelectionApiReducer<TItem>;
  defaultState?: SelectionApiState<TItem>;
}

export interface SelectionEvent<TItem> {
  mouseEvent?: MouseEvent;
  item: TItem;
}
