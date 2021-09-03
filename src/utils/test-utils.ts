import { UseSelectionApiReducerActions } from "..";

export interface TestItem {
  key: number;
}

export const getTestItemKey = (item: TestItem): number => item.key;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createTestAction = ({
  getKey = getTestItemKey,
  isSelected = (() => true) as (item: TestItem) => boolean,
  items = [],
  type,
  mouseEvent = undefined,
  ...other
}): UseSelectionApiReducerActions<TestItem> => ({
  getKey,
  items,
  isSelected,
  type,
  mouseEvent,
  ...other,
});
