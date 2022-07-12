import React, { useCallback, useRef } from "react";
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
  const cartItems = useRef<CartItem[]>([]);

  const findItem = useCallback((itemId: number): CartItem | undefined => {
    return cartItems.current.find((item) => item.content.itemId === itemId);
  }, []);

  const addItem = useCallback(
    (item: Item, count: number) => {
      if (!findItem(item.itemId)) {
        cartItems.current.push({ content: item, count });
        return;
      }

      cartItems.current = cartItems.current.map((cartItem) => {
        if (cartItem.content.itemId !== item.itemId) return cartItem;
        return { ...cartItem, count: cartItem.count + count };
      });
    },
    [findItem]
  );

  const incrementItem = useCallback((item: Item) => addItem(item, 1), [addItem]);

  const decrementItem = useCallback(
    (itemId: number) => {
      const targetItem = findItem(itemId);
      if (!targetItem) return;
      if (targetItem.count <= 0) return;

      cartItems.current = cartItems.current.map((cartItem) => {
        if (cartItem.content.itemId !== itemId) return cartItem;
        return { ...targetItem, count: cartItem.count - 1 };
      });
    },
    [findItem]
  );

  const getTotal = () => {
    let total = 0;
    cartItems.current.forEach((element) => {
      total += element.content.price * element.count;
    });
    return total;
  };

  return (
    <CartContext.Provider value={{ cartItems: cartItems.current, incrementItem, decrementItem, addItem, getTotal }}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContext;
