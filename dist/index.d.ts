export interface SelectionState<TItem> {
    [key: string]: TItem;
    [key: number]: TItem;
}
export declare type KeyGetter<TItem> = (item: TItem) => string | number;
export declare type UseSelectionResult<TItem> = [(item: TItem) => void, SelectionState<TItem>];
declare const useSelection: <TItem>(getKey: KeyGetter<TItem>) => UseSelectionResult<TItem>;
export default useSelection;
