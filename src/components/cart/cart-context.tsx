"use client";

import { Product } from "@/types";
import { createContext, ReactNode, useContext, useReducer } from "react";
import { Cart } from "./types";

type CartContextType = {
  cart: Cart;
  dispatch: (action: CartAction) => void;
  totalQuantities: number;
  totalPrice: number;
};

const CartContext = createContext({} as CartContextType);

type CartAction =
  | { type: "add"; product: Product; quantity: number }
  | { type: "remove"; productId: string }
  | {
      type: "clear";
    }
  | { type: "update"; product: Product; quantity: number };

const cartReducer = (state: Cart, action: CartAction) => {
  switch (action.type) {
    case "add": {
      const existingItem = state.items.find(
        (item) => item.product.id === action.product.id,
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.product.id === action.product.id
              ? { ...item, quantity: item.quantity + action.quantity }
              : item,
          ),
        };
      }

      return {
        ...state,
        items: [...state.items, { product: action.product, quantity: 1 }],
      };
    }

    case "remove": {
      return {
        ...state,
        items: state.items.filter(
          (item) => item.product.id !== action.productId,
        ),
      };
    }

    case "clear": {
      return { items: [] };
    }

    case "update": {
      return {
        ...state,
        items: state.items.map((item) =>
          item.product.id === action.product.id
            ? { ...item, quantity: action.quantity }
            : item,
        ),
      };
    }
  }
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, { items: [] });

  const totalQuantities = cart.items.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  const totalPrice = cart.items.reduce(
    (total, item) => total + Number(item.product.price) * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        dispatch,
        totalQuantities,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}