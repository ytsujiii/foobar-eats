import React, { useCallback, useState } from "react";
import Item from "../types/Item";

interface CartItem {
  content: Item;
  count: number;
}

interface CartContextType {
  cartItems: CartItem[];
  getTotal: () => number;
  addItem: (item: Item, count: number) => void;
  incrementItem: (item: Item) => void;
  decrementItem: (itemId: number) => void;
}

const defaultValue: CartContextType = {
  cartItems: [],
  getTotal: () => 0,
  addItem: () => {
    /* do nothing */
  },
  incrementItem: () => {
    /* do nothing */
  },
  decrementItem: () => {
    /* do nothing */
  },
};

const CartContext = React.createContext<CartContextType>(defaultValue);

export const CartContextProvider = (props: { children: React.ReactNode }): React.ReactElement => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const findItem = useCallback((itemId: number): CartItem | undefined => {
    return cartItems.find((item) => item.content.itemId === itemId);
  }, []);

  const addItem = useCallback(
    (item: Item, count: number) => {
      if (!findItem(item.itemId)) {
        const newCartItems = [...cartItemsRef.current, { content: item, count }];
        setCartItems(newCartItems);
        return;
      }

      const newCartItems = cartItems.map((cartItem) => {
        if (cartItem.content.itemId !== item.itemId) return cartItem;
        return { ...cartItem, count: cartItem.count + count };
      });
      setCartItems(newCartItems);
    },
    [findItem]
  );

  const incrementItem = useCallback((item: Item) => addItem(item, 1), [addItem]);

  const decrementItem = useCallback(
    (itemId: number) => {
      const targetItem = findItem(itemId);
      if (!targetItem) return;
      if (targetItem.count <= 0) return;

      const newCartItems = cartItems.map((cartItem) => {
        if (cartItem.content.itemId !== itemId) return cartItem;
        return { ...targetItem, count: cartItem.count - 1 };
      });
      setCartItems(newCartItems);
    },
    [findItem]
  );

  const getTotal = () => {
    let total = 0;
    cartItems.forEach((element) => {
      total += element.content.price * element.count;
    });
    return total;
  };

  return (
    <CartContext.Provider value={{ cartItems, incrementItem, decrementItem, addItem, getTotal }}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContext;
