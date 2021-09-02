import {
  UseSelectionApiReducerActions,
  UseSelectionDefaultActions,
} from "../types";
import baseReducer from "./base-reducer";

interface TestItem {
  key: number;
}

describe("base reducer", () => {
  const getTestItemKey = (item: TestItem) => item.key;
  const createAction = ({
    getKey = getTestItemKey,
    isSelected = () => true,
    items = [],
    type,
    ...other
  }): UseSelectionApiReducerActions<TItem> => ({
    getKey,
    items,
    isSelected,
    type,
    ...other,
  });
  it("exists", () => {
    expect(baseReducer).not.toBeUndefined();
  });

  describe("remove", () => {
    it("no selection", () => {
      const state = { selectedItems: [] };
      const action = createAction({
        type: UseSelectionDefaultActions.remove,
        item: { key: 1 },
      });
      expect(baseReducer(state, action)).toEqual({ selectedItems: [] });
    });

    it("the only selection", () => {
      const selectedItems = [{ key: 2 }];
      const state = { selectedItems };
      const action = createAction({
        type: UseSelectionDefaultActions.remove,
        item: { key: 2 },
      });
      expect(baseReducer(state, action)).toEqual({ selectedItems: [] });
    });

    it("multiple selected", () => {
      const selectedItems = [{ key: 2 }, { key: 1 }, { key: 3 }];
      const state = { selectedItems };
      const action = createAction({
        type: UseSelectionDefaultActions.remove,
        item: { key: 2 },
      });
      expect(baseReducer(state, action)).toEqual({
        selectedItems: [{ key: 1 }, { key: 3 }],
      });
    });
  });

  describe("append", () => {
    it("is selected already", () => {
      const state = { selectedItems: [{ key: 1 }] };
      const action = createAction({
        type: UseSelectionDefaultActions.append,
        item: { key: 1 },
        isSelected: () => true,
      });

      expect(baseReducer(state, action)).toEqual(state);
    });

    it("no selection", () => {
      const state = { selectedItems: [] };
      const action = createAction({
        type: UseSelectionDefaultActions.append, 
        item: { key: 1 },
        isSelected: () => false,
      });

      expect(baseReducer(state, action)).toEqual({
        selectedItems: [{ key: 1 }],
      });
    });
  });
});
