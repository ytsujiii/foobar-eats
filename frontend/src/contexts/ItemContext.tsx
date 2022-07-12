import React, { useCallback, useEffect, useState } from "react";
import Api from "../api";
import Item from "../types/Item";

interface ItemContextType {
  items: Item[] | undefined;
  findItem: (itemId: number) => Item | undefined;
}

const defaultValue: ItemContextType = {
  items: [],
  findItem: () => undefined,
};

const ItemContext = React.createContext<ItemContextType>(defaultValue);

export const ItemContextProvider = (props: { children: React.ReactNode }): React.ReactElement => {
  const [items, setItems] = useState<Item[]>();

  useEffect(() => {
    Api.getItems().then((response) => setItems(response));
  }, []);

  const findItem = useCallback(
    (itemId: number): Item | undefined => {
      return items?.find((item) => item.itemId === itemId);
    },
    [items]
  );

  return <ItemContext.Provider value={{ items, findItem }}>{props.children}</ItemContext.Provider>;
};

export default ItemContext;
