import mockItems, { TestItem } from "../utils/mock-items";
import fillRange from "./fill-range";

describe("fill range", () => {
  const items = mockItems(10);
  const getKey = (item: TestItem) => item.id;
  describe("no selection", () => {
    it("first item", () => {
      const selection = {};
      const selectedItem: TestItem = items[0];

      expect(fillRange(selectedItem, items, selection, getKey)).toEqual([
        items[0],
      ]);
    });

    it("middle item", () => {
      const selection = {};
      const selectedItem: TestItem = items[3];

      expect(fillRange(selectedItem, items, selection, getKey)).toEqual([
        items[0],
        items[1],
        items[2],
        items[3],
      ]);
    });

    it("last item", () => {
      const selection = {};
      const selectedItem: TestItem = items[items.length - 1];

      expect(fillRange(selectedItem, items, selection, getKey)).toEqual(items);
    });
  });

  describe("one selection", () => {
    describe.each([[0], [3]])(
      "after selection - selected index = %s",
      (selectedIndex: number) => {
        it("middle", () => {
          const selection = { [items[selectedIndex].id]: items[selectedIndex] };
          const selectedItem = items[items.length - 2];

          expect(fillRange(selectedItem, items, selection, getKey)).toEqual(
            items.slice(selectedIndex, items.length - 1)
          );
        });

        it("last", () => {
          const selection = { [items[selectedIndex].id]: items[selectedIndex] };
          const selectedItem = items[items.length - 1];

          expect(fillRange(selectedItem, items, selection, getKey)).toEqual(
            items.slice(selectedIndex, items.length)
          );
        });
      }
    );

    describe.each([[items.length - 1], [5]])(
      "before selection - selected index = %s",
      (selectedIndex: number) => {
        it("middle", () => {
          const selection = { [items[selectedIndex].id]: items[selectedIndex] };
          const selectedItem = items[2];

          expect(fillRange(selectedItem, items, selection, getKey)).toEqual(
            items.slice(2, selectedIndex + 1)
          );
        });

        it("first", () => {
          const selection = { [items[selectedIndex].id]: items[selectedIndex] };
          const selectedItem = items[0];

          expect(fillRange(selectedItem, items, selection, getKey)).toEqual(
            items.slice(0, selectedIndex + 1)
          );
        });
      }
    );
  });

  describe("multiple selections", () => {
    const selectRange = (start: number, end: number) =>
      Object.assign(
        {},
        ...items.map((item) => ({ [getKey(item)]: item })).slice(start, end + 1)
      );

    it("extends in front", () => {
      const selection = selectRange(3, 5);
      const selectedItem = items[0];

      expect(fillRange(selectedItem, items, selection, getKey)).toEqual(
        items.slice(0, 6)
      );
    });

    it("extends in back", () => {
      const selection = selectRange(3, 5);
      const selectedItem = items[items.length - 1];

      expect(fillRange(selectedItem, items, selection, getKey)).toEqual(
        items.slice(3, items.length)
      );
    });

    it("removes from back", () => {
      const selection = selectRange(0, items.length - 1);
      const selectedItem = items[3];

      expect(fillRange(selectedItem, items, selection, getKey)).toEqual(
        items.slice(0, 4)
      );
    });
  });
});
