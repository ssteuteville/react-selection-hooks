import findLastIndex from "./find-last-index";

describe("find last index", () => {
  const uniqueItems = [1, 2, 3, 4, 5, 6, 7];
  const items = uniqueItems.concat(...uniqueItems);

  it("returns -1 if not found", () => {
    expect(findLastIndex(uniqueItems, (item) => item > 7)).toEqual(-1);
  });

  describe("first item", () => {
    it("unique", () => {
      expect(findLastIndex(uniqueItems, (item) => item === 1)).toEqual(0);
    });

    it("duplicates", () => {
      expect(findLastIndex(items, (item) => item === 1)).toEqual(
        uniqueItems.length
      );
    });
  });

  describe("last item", () => {
    it("unique", () => {
      expect(findLastIndex(uniqueItems, (item) => item === 7)).toEqual(
        uniqueItems.length - 1
      );
    });

    it("duplicates", () => {
      expect(findLastIndex(items, (item) => item === 7)).toEqual(
        items.length - 1
      );
    });
  });

  describe("middle item", () => {
    it("unique", () => {
      expect(findLastIndex(uniqueItems, (item) => item === 4)).toEqual(3);
    });

    it("duplicates", () => {
      expect(findLastIndex(items, (item) => item === 4)).toEqual(
        uniqueItems.length + 3
      );
    });
  });
});
