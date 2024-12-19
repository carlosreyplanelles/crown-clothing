import { useContext } from "react";
import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total,
} from "./checkout.styles";
import { CartContext } from "../../contexts/cart.context";
import { CheckoutCard } from "../../components/checkout-card/checkout-card.componen";
import { useSelector } from "react-redux";
import {
  calculateCartTotal,
  getCartItems,
} from "../../store/cart/cart.selector";

export function Checkout() {
  const cartItems = useSelector(getCartItems);
  const cartTotal = useSelector(calculateCartTotal);
  console.log("Checkout - cartItems", cartItems);

  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Remove</span>
        </HeaderBlock>
      </CheckoutHeader>
      {cartItems.map((item) => {
        return <CheckoutCard key={item.id} cartItem={item} />;
      })}
      <Total>Total: {cartTotal}€</Total>
    </CheckoutContainer>
  );
}
