import { createSelector } from "reselect";

const cartItemsMemoSelector = (state) => state.cart.cartItems;
const showMiniCartMemoSelector = (state) => state.cart.showMiniCart;
const cartMemoSelector = (state) => state.cart;

export const getCartItems = createSelector(
  [cartItemsMemoSelector],
  (cartItems) => cartItems
);

export const getShowMiniCart = createSelector(
  [showMiniCartMemoSelector],
  (showMiniCart) => showMiniCart
);

export const getCart = createSelector([cartMemoSelector], (cart) => cart);
