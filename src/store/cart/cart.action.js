import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducers/reducers.utils";

const addCartItem = (cartItems, item) => {
  console.log("cartItems", cartItems);
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

const createUpdateCartAction = (newCartItems) => {
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const setShowMiniCart = (newShowMinicart) => {
  console.log(newShowMinicart);
  return createAction(CART_ACTION_TYPES.TOGGLE_MINICART, newShowMinicart);
};

export const addToCart = (cartItems, item) => {
  const newCartItems = addCartItem(cartItems, item);
  return createUpdateCartAction(newCartItems);
};

export const removeCartItem = (cartItems, item) => {
  const newCartItems = removeItem(cartItems, item);
  return createUpdateCartAction(newCartItems);
};

export const removeCartItemFromBasket = (cartItems, item) => {
  const newCartItems = clearItemFromBasket(cartItems, item);
  return createUpdateCartAction(newCartItems);
};
