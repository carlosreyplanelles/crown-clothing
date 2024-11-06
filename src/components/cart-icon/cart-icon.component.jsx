import { useContext } from "react";
import { CartIconContainer, ShoppingIcon, ItemCount } from "./cart-icon.styles";

import { CartContext } from "../../contexts/cart.context";

export function CartIcon() {
  const { showMiniCart, setShowMiniCart, itemsCount } = useContext(CartContext);

  const toggleShowMiniCart = () => {
    setShowMiniCart(!showMiniCart);
  };

  return (
    <CartIconContainer onClick={toggleShowMiniCart}>
      <ShoppingIcon />
      <ItemCount>{itemsCount}</ItemCount>
    </CartIconContainer>
  );
}
