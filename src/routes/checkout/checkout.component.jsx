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

export function Checkout() {
  const { cartItems, cartTotal } = useSelector((state) => state.cart);
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
