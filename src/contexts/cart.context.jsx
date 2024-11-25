import { createContext, useState, useReducer, useEffect } from "react";

export const CartContext = createContext({
  showMiniCart: false,
  setShowMiniCart: () => null,
  cartItems: [],
  addItemToCart: () => {},
  itemsCount: 0,
  removeItem: () => {},
  clearItemFromBasket: () => {},
  cartTotal: 0,
});
export const CART_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  TOGGLE_MINICART: "TOGGLE_MINICART",
};

const addCartItem = (cartItems, item) => {
  //find the item into cartItems
  const foundItem = cartItems.find((cartItem) => {
    return cartItem.id === item.id;
  });
  //If found increment quantity
  if (foundItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === item.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  //return new array
  return [...cartItems, { ...item, quantity: 1 }];
};

const removeItem = (cartItems, itemToRemove) => {
  const foundItem = cartItems.find((cartItem) => {
    return cartItem.id === itemToRemove.id;
  });

  if (foundItem) {
    if (foundItem.quantity === 1) {
      return cartItems.filter((cartItem) => cartItem.id !== itemToRemove.id);
    }
    return cartItems.map((cartItem) =>
      cartItem.id === itemToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  }
};

const clearItemFromBasket = (cartItems, itemToRemove) => {
  const foundItem = cartItems.find((cartItem) => {
    return cartItem.id === itemToRemove.id;
  });

  if (foundItem) {
    return cartItems.filter((cartItem) => cartItem.id !== itemToRemove.id);
  }
};

const calculateItemsCount = (cartItems) => {
  return cartItems.reduce(
    (itemsInBasket, item) => itemsInBasket + item.quantity,
    0
  );
};

const calculateItemsPrice = (cartItems) => {
  return cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity * cartItem.price,
    0
  );
};

const BasketReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_CART_ITEMS":
      return {
        ...state,
        ...payload,
      };

    case "TOGGLE_MINICART":
      console.log(payload);
      return {
        ...state,
        ...payload,
      };

    default:
      throw new Error(`Unhandeled type ${type} in BasketReducer`);
  }
};

const BASKET_INITIAL = {
  showMiniCart: false,
  cartItems: [],
  itemsCount: 0,
  cartTotal: 0,
};

export const CartProvider = ({ children }) => {
  //USESTATE EXAMPLE
  //const [showMiniCart, setShowMiniCart] = useState(false);
  //const [cartItems, setCartItems] = useState([]);
  //const [itemsCount, setItemsCount] = useState(0);
  //const [cartTotal, setCartTotal] = useState(0)
  //REDUCERS
  const [{ cartItems, cartTotal, itemsCount, showMiniCart }, dispatcher] =
    useReducer(BasketReducer, BASKET_INITIAL);
  const updateCart = (newCartItems) => {
    const updatedItemsCount = calculateItemsCount(newCartItems);
    const updatedBasketPrice = calculateItemsPrice(newCartItems);
    const payload = {
      cartItems: newCartItems,
      itemsCount: updatedItemsCount,
      cartTotal: updatedBasketPrice,
    };
    dispatcher({
      type: CART_ACTION_TYPES.SET_CART_ITEMS,
      payload: payload,
    });
  };

  const setShowMiniCart = () => {
    const newShowMinicart = !showMiniCart;
    dispatcher({
      type: CART_ACTION_TYPES.TOGGLE_MINICART,
      payload: { showMiniCart: newShowMinicart },
    });
  };

  const addToCart = (item) => {
    const newCartItems = addCartItem(cartItems, item);
    updateCart(newCartItems);
  };

  const removeCartItem = (item) => {
    const newCartItems = removeItem(cartItems, item);
    updateCart(newCartItems);
  };

  const removeCartItemFromBasket = (item) => {
    const newCartItems = clearItemFromBasket(cartItems, item);
    updateCart(newCartItems);
  };

  const value = {
    showMiniCart,
    setShowMiniCart,
    cartItems,
    addToCart,
    itemsCount,
    removeCartItem,
    removeCartItemFromBasket,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
