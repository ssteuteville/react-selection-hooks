import { UseSelectionDefaultActions } from "..";
import { createTestAction, TestItem } from "../utils/test-utils";
import pivotReducer from "./pivot-reducer";
import { toggleTests } from "./base-reducer.test";

const mockIsMacOS = jest.fn((): boolean => true);

jest.mock("../utils/is-mac-os", () => () => mockIsMacOS());

describe("pivot reducer", () => {
  const testItems: TestItem[] = [{ key: 1 }, { key: 2 }, { key: 3 }];
  const standardTestCases = (mouseEvent) => {
    it("no selection", () => {
      const state = { selectedItems: [] };
      const action = createTestAction({
        type: UseSelectionDefaultActions.mouse,
        item: { key: 1 },
        items: testItems,
        mouseEvent,
      });
      expect(pivotReducer(state, action)).toEqual({
        pivotKey: 1,
        selectedItems: [{ key: 1 }],
      });
    });

    it("existing selection", () => {
      const state = {
        selectedItems: [testItems[0], testItems[1]],
        pivotKey: testItems[0].key,
      };
      const action = createTestAction({
        type: UseSelectionDefaultActions.mouse,
        item: { key: 3 },
        items: testItems,
        mouseEvent,
      });
      expect(pivotReducer(state, action)).toEqual({
        pivotKey: 3,
        selectedItems: [{ key: 3 }],
      });
    });

    it("already selected", () => {
      const state = {
        selectedItems: [testItems[0]],
        pivotKey: testItems[0].key,
      };
      const action = createTestAction({
        type: UseSelectionDefaultActions.mouse,
        item: testItems[0],
        items: testItems,
        mouseEvent,
      });
      expect(pivotReducer(state, action)).toEqual({
        pivotKey: testItems[0].key,
        selectedItems: [testItems[0]],
      });
    });
  };

  describe.each([
    ["no mouse event", undefined],
    ["no modifiers", {}],
  ])("%s", (suiteName, mouseEvent) => {
    standardTestCases(mouseEvent);
  });

  describe("shift modifier", () => {
    const mouseEvent = { shiftKey: true };
    it("no selection", () => {
      const state = {
        selectedItems: [],
      };

      const action = createTestAction({
        type: UseSelectionDefaultActions.mouse,
        item: testItems[1],
        items: testItems,
        mouseEvent,
      });

      expect(pivotReducer(state, action)).toEqual({
        pivotKey: testItems[1].key,
        selectedItems: [testItems[1]],
      });
    });

    it("after pivot", () => {
      const state = {
        selectedItems: [testItems[0], testItems[1]],
        pivotKey: testItems[0].key,
      };
      const action = createTestAction({
        type: UseSelectionDefaultActions.mouse,
        item: testItems[2],
        items: testItems,
        mouseEvent,
      });
      expect(pivotReducer(state, action)).toEqual({
        pivotKey: testItems[0].key,
        selectedItems: [testItems[0], testItems[1], testItems[2]],
      });
    });

    it("before pivot", () => {
      const state = {
        selectedItems: [testItems[1], testItems[2]],
        pivotKey: testItems[1].key,
      };
      const action = createTestAction({
        type: UseSelectionDefaultActions.mouse,
        item: testItems[0],
        items: testItems,
        mouseEvent,
      });
      expect(pivotReducer(state, action)).toEqual({
        pivotKey: state.pivotKey,
        selectedItems: [testItems[0], testItems[1]],
      });
    });

    it("is pivot", () => {
      const state = {
        selectedItems: testItems,
        pivotKey: testItems[2].key,
      };
      const action = createTestAction({
        type: UseSelectionDefaultActions.mouse,
        item: testItems[2],
        items: testItems,
        mouseEvent,
      });
      expect(pivotReducer(state, action)).toEqual({
        pivotKey: state.pivotKey,
        selectedItems: [testItems[2]],
      });
    });
  });

  describe("toggle modifier", () => {
    describe.each([
      [true, "ctrlKey"],
      [false, "metaKey"],
    ])("opposite system modifier %s %s", (isMacOs, key) => {
      beforeEach(() => mockIsMacOS.mockImplementation(() => isMacOs));
      afterEach(jest.clearAllMocks);
      standardTestCases({ [key]: true });
    });

    describe("toggles", () => {
      const mouseEvent = { metaKey: true };
      beforeEach(() => {
        mockIsMacOS.mockImplementation(() => true);
      });

      afterEach(jest.clearAllMocks);

      toggleTests(pivotReducer, UseSelectionDefaultActions.mouse, mouseEvent);

      it("pivot key is null", () => {
        const state = { selectedItems: [] };
        const action = createTestAction({
          type: UseSelectionDefaultActions.mouse,
          mouseEvent,
          item: testItems[1],
        });

        expect(pivotReducer(state, action).pivotKey).toEqual(testItems[1].key);
      });

      it("pivot key is not null", () => {
        const state = {
          selectedItems: [testItems[1]],
          pivotKey: testItems[1].key,
        };
        const action = createTestAction({
          type: UseSelectionDefaultActions.mouse,
          mouseEvent,
          item: testItems[0],
        });

        expect(pivotReducer(state, action).pivotKey).toEqual(testItems[0].key);
      });

      it("is the pivot key", () => {
        const state = {
          selectedItems: testItems,
          pivotKey: testItems[testItems.length - 1].key,
        };
        const action = createTestAction({
          type: UseSelectionDefaultActions.mouse,
          mouseEvent,
          item: testItems[testItems.length - 1],
        });

        expect(pivotReducer(state, action).pivotKey).toEqual(
          testItems[testItems.length - 1].key
        );
      });
    });
  });
});
