import { CART_ACTION_TYPES } from "./cart.types";
const CART_INITIAL = {
  showMiniCart: false,
  cartItems: [],
  itemsCount: 0,
  cartTotal: 0,
};

export const cartReducer = (state = CART_INITIAL, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS: {
      return { ...state, ...payload };
    }

    case CART_ACTION_TYPES.TOGGLE_MINICART:
      console.log(CART_ACTION_TYPES.TOGGLE_MINICART);
      return { ...state, showMiniCart: payload };

    default:
      return state;
  }
};