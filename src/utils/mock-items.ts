export interface TestItem {
  name: string;
  id: number;
}

const mockItems = (count: number): TestItem[] =>
  Array.from({ length: count }).map((_, index) => ({
    name: `name ${index}`,
    id: index,
  }));

export default mockItems;
