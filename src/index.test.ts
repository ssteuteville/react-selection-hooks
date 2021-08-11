import { renderHook, act } from "@testing-library/react-hooks";
import useSelection from ".";
interface TestItem {
  key: string;
}

const NUM_ITEMS = 20;

describe("api", () => {
  const mockItems = Array.from({ length: NUM_ITEMS }).map((_, i) => ({
    key: `Item-${i}`,
  }));
  const getKey = (item: TestItem): string => item.key;

  it("default state", () => {
    const { result } = renderHook(() => useSelection(mockItems, getKey));
    expect(result.current.onSelect).toEqual(expect.any(Function));
    expect(result.current.selectionState).toEqual({});
  });

  describe("onSelect", () => {
    it.each([[0], [5], [NUM_ITEMS - 1]])(
      `first selection index = %s of ${NUM_ITEMS}`,
      (itemIndex: number) => {
        const { result } = renderHook(() => useSelection(mockItems, getKey));
        const selectedItem = mockItems[itemIndex];

        act(() => {
          result.current.onSelect(selectedItem);
        });

        expect(Object.keys(result.current.selectionState).length).toBe(1);
        expect(!!result.current.selectionState[selectedItem.key]).toBe(true);
      }
    );

    // TODO: regular clicks

    // TODO: shift clicks

    // TODO: ctrl clicks
  });
});
