import { createContext, useEffect, useReducer } from "react";

export const CartContext = createContext({
  items: [],
});

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "ADD":
      return {
        ...state,
        items: payload.items,
      };

    case "REMOVE":
      return {
        ...state,
        items: payload.items,
      };

    default:
      throw new Error("No case for that type");
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  // persist cart in local storage
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (cart && state.items.length === 0) {
      dispatch({
        type: "ADD",
        payload: {
          items: cart,
        },
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = (product) => {
    const updatedCart = [...state.items, product];

    dispatch({
      type: "ADD",
      payload: {
        items: updatedCart,
      },
    });
  };

  const removeFromCart = (id) => {
    const updatedCart = state.items.filter(
      (currentProduct) => currentProduct.id !== id
    );

    dispatch({
      type: "REMOVE",
      payload: {
        items: updatedCart,
      },
    });
  };

  const value = {
    items: state.items,
    addToCart,
    removeFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
