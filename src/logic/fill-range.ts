import { KeyGetter, SelectionState } from "..";
import findLastIndex from "../utils/find-last-index";

const fillRange = <TItem>(
  selectedItem: TItem,
  items: TItem[],
  selection: SelectionState<TItem>,
  getKey: KeyGetter<TItem>
): TItem[] => {
  const firstSelectedItemIndex = items.findIndex(
    (item) => selection[getKey(item)] != null
  );
  const lastSelectedItemIndex =
    firstSelectedItemIndex === -1
      ? -1
      : findLastIndex(items, (item) => selection[getKey(item)] != null);
  const itemIndex = items.findIndex(
    (item) => getKey(item) == getKey(selectedItem)
  );

  if (firstSelectedItemIndex < itemIndex) {
    return items.slice(Math.max(firstSelectedItemIndex, 0), itemIndex + 1);
  } else {
    return items.slice(
      itemIndex,
      Math.min(items.length - 1, lastSelectedItemIndex) + 1
    );
  }
};

export default fillRange;
