import React from "react";
import { UseSelectionApiReducer, UseSelectionDefaultActions } from "../types";
import { createTestAction, TestItem } from "../utils/test-utils";
import baseReducer from "./base-reducer";

export const toggleTests = (
  reducer: UseSelectionApiReducer<TestItem>,
  actionType: UseSelectionDefaultActions,
  mouseEvent: Partial<React.MouseEvent> = undefined
): void => {
  const items = [{ key: 1 }, { key: 2 }, { key: 3 }];

  it("not selection", () => {
    const state = { selectedItems: [] };
    const action = createTestAction({
      type: actionType,
      item: { key: 1 },
      isSelected: () => false,
      items,
      mouseEvent,
    });

    expect(reducer(state, action)).toEqual(
      expect.objectContaining({
        selectedItems: [{ key: 1 }],
      })
    );
  });

  it("already selected", () => {
    const state = { selectedItems: [{ key: 1 }] };
    const action = createTestAction({
      type: actionType,
      item: { key: 1 },
      isSelected: (item) => item.key === 1,
      items,
      mouseEvent,
    });

    expect(baseReducer(state, action)).toEqual(
      expect.objectContaining({
        selectedItems: [],
      })
    );
  });
};

describe("base reducer", () => {
  it("exists", () => {
    expect(baseReducer).not.toBeUndefined();
  });

  describe("remove", () => {
    it("no selection", () => {
      const state = { selectedItems: [] };
      const action = createTestAction({
        type: UseSelectionDefaultActions.remove,
        item: { key: 1 },
      });
      expect(baseReducer(state, action)).toEqual({ selectedItems: [] });
    });

    it("the only selection", () => {
      const selectedItems = [{ key: 2 }];
      const state = { selectedItems };
      const action = createTestAction({
        type: UseSelectionDefaultActions.remove,
        item: { key: 2 },
      });
      expect(baseReducer(state, action)).toEqual({ selectedItems: [] });
    });

    it("multiple selected", () => {
      const selectedItems = [{ key: 2 }, { key: 1 }, { key: 3 }];
      const state = { selectedItems };
      const action = createTestAction({
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
      const action = createTestAction({
        type: UseSelectionDefaultActions.append,
        item: { key: 1 },
        isSelected: () => true,
      });

      expect(baseReducer(state, action)).toEqual(state);
    });

    it("no selection", () => {
      const state = { selectedItems: [] };
      const action = createTestAction({
        type: UseSelectionDefaultActions.append,
        item: { key: 1 },
        isSelected: () => false,
      });

      expect(baseReducer(state, action)).toEqual({
        selectedItems: [{ key: 1 }],
      });
    });

    it("existing selection", () => {
      const items = [{ key: 1 }, { key: 2 }, { key: 3 }];
      const state = { selectedItems: items.slice(1, 3) };
      const action = createTestAction({
        type: UseSelectionDefaultActions.append,
        item: { key: 1 },
        isSelected: (item) =>
          items.slice(1, 3).find((i) => item.key === i.key) != null,
        items,
      });

      expect(baseReducer(state, action)).toEqual({
        selectedItems: [{ key: 2 }, { key: 3 }, { key: 1 }],
      });
    });
  });

  describe.each([
    [UseSelectionDefaultActions.mouse],
    [UseSelectionDefaultActions.toggle],
  ])("toggles on %s action", (actionType) => {
    toggleTests(baseReducer, actionType);
  });

  it("clear", () => {
    const items = [{ key: 1 }, { key: 2 }];
    const state = { selectedItems: items };
    const action = createTestAction({
      type: UseSelectionDefaultActions.clear,
      item: { key: 1 },
      isSelected: () => true,
      items,
    });

    expect(baseReducer(state, action)).toEqual({
      selectedItems: [],
    });
  });
});
