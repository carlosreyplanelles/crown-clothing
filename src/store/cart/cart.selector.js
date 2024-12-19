import { createSelector } from "reselect";

const cartItemsMemoSelector = (state) => state.cart.cartItems;
const cartReducerMemoSelector = (state) => state.cart;

export const getCartItems = createSelector(
  [cartReducerMemoSelector],
  (cart) => cart.cartItems
);

export const getShowMiniCart = createSelector(
  [cartReducerMemoSelector],
  (cart) => cart.showMiniCart
);

export const calculateItemsCount = createSelector(
  [cartItemsMemoSelector],
  (cartItems) =>
    cartItems.reduce((itemsInBasket, item) => itemsInBasket + item.quantity, 0)
);

export const calculateCartTotal = createSelector(
  [cartItemsMemoSelector],
  (cartItems) =>
    cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    )
);
