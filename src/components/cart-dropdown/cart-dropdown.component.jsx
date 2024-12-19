import {
  CartDropdownContainer,
  CartItems,
  EmptyMessage,
} from "./cart-dropdown.styles";

import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../button/button.component";
import { CartContext } from "../../contexts/cart.context";
import { CartItem } from "../cart-item/cart-item.component";
import { useSelector } from "react-redux";
import { getCartItems } from "../../store/cart/cart.selector";

export function CartDropdown() {
  const cartItems = useSelector(getCartItems);

  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate("/checkout");
  };

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => {
            return <CartItem key={item.id} cartItem={item} />;
          })
        ) : (
          <EmptyMessage>Cart empty</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={goToCheckoutHandler} text="CHECKOUT" />
    </CartDropdownContainer>
  );
}
