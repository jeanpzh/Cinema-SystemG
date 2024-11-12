import { useMemo } from "react";

interface Props<T> {
  searchTerm: string;
  memoItems: T[];
  getNombreItem: (item: T) => string;
}

function ItemFilter<T>({ searchTerm, memoItems, getNombreItem }: Props<T>) {
  const filteredItems = useMemo(() => {
    return memoItems.filter((item) =>
      getNombreItem(item).toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, memoItems, getNombreItem]);
  return filteredItems;
}

export default ItemFilter;
