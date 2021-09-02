import { renderHook, act } from "@testing-library/react-hooks";
import useSelection from ".";
import { UseSelectionOptions } from "./types";
interface TestItem {
  key: string;
}

const NUM_ITEMS = 20;

describe("api", () => {
  const mockItems = Array.from({ length: NUM_ITEMS }).map((_, i) => ({
    key: `Item-${i}`,
  }));
  const getKey = (item: TestItem): string => item.key;

  const render = (
    items: TestItem[] = mockItems,
    options: Partial<UseSelectionOptions<TestItem>> = {}
  ) => {
    return renderHook(() =>
      useSelection(items, {
        getKey,
        ...options,
      })
    );
  };

  it("default state", () => {
    const { result } = render();
    expect(result.current.onSelect).toEqual(expect.any(Function));
    expect(result.current.selectedItems).toEqual([]);
  });

  describe("onSelect", () => {
    it.each([[0], [5], [NUM_ITEMS - 1]])(
      `first selection index = %s of ${NUM_ITEMS}`,
      (itemIndex: number) => {
        const { result } = render();
        const selectedItem = mockItems[itemIndex];

        act(() => {
          result.current.onSelect(selectedItem);
        });

        expect(result.current.selectedItems.length).toBe(1);
        expect(result.current.selectedItems.indexOf(selectedItem) > -1).toBe(
          true
        );
      }
    );

    // TODO: regular clicks

    // TODO: shift clicks

    // TODO: ctrl clicks
  });
});
