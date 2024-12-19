import { CART_ACTION_TYPES } from "./cart.types";

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

const updateCart = (newCartItems) => {
  const updatedItemsCount = calculateItemsCount(newCartItems);
  const updatedBasketPrice = calculateItemsPrice(newCartItems);
  const payload = {
    cartItems: newCartItems,
    itemsCount: updatedItemsCount,
    cartTotal: updatedBasketPrice,
  };
  return {
    type: CART_ACTION_TYPES.SET_CART_ITEMS,
    payload: payload,
  };
};

export const setShowMiniCart = (newShowMinicart) => {
  console.log(newShowMinicart);
  return {
    type: CART_ACTION_TYPES.TOGGLE_MINICART,
    payload: newShowMinicart,
  };
};

export const addToCart = (cartItems, item) => {
  const newCartItems = addCartItem(cartItems, item);
  return updateCart(newCartItems);
};

export const removeCartItem = (cartItems, item) => {
  const newCartItems = removeItem(cartItems, item);
  return updateCart(newCartItems);
};

export const removeCartItemFromBasket = (cartItems, item) => {
  const newCartItems = clearItemFromBasket(cartItems, item);
  return updateCart(newCartItems);
};
