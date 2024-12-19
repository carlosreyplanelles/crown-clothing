import { useContext } from "react";
import { CartIconContainer, ShoppingIcon, ItemCount } from "./cart-icon.styles";

import { CartContext } from "../../contexts/cart.context";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../store/cart/cart.selector";
import { setShowMiniCart } from "../../store/cart/cart.action";

export function CartIcon() {
  const dispatch = useDispatch();
  const { showMiniCart, itemsCount } = useSelector(getCart);
  const toggleShowMiniCart = () => {
    dispatch(setShowMiniCart(!showMiniCart));
  };

  return (
    <CartIconContainer onClick={toggleShowMiniCart}>
      <ShoppingIcon />
      <ItemCount>{itemsCount}</ItemCount>
    </CartIconContainer>
  );
}
