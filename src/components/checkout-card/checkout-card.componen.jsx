import { useContext } from "react";
import {
  CheckoutItemContainer,
  ImageContainer,
  FieldText,
  QuantityContainer,
  RemoveButton,
} from "./checkout-card.styles";
import { CartContext } from "../../contexts/cart.context";
export function CheckoutCard({ basketItem, decreaseHandler }) {
  const { name, quantity, price, imageUrl } = basketItem;
  const { addToCart, removeCartItem, removeCartItemFromBasket } =
    useContext(CartContext);

  const addItemHandler = () => {
    addToCart(basketItem);
  };
  const removeItemHandler = () => {
    removeCartItem(basketItem);
  };
  const clearItemHandler = () => {
    removeCartItemFromBasket(basketItem);
  };

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={name} />
      </ImageContainer>
      <FieldText>{name}</FieldText>
      <QuantityContainer>
        <div onClick={removeItemHandler}>&#10094;</div>
        <span>{quantity}</span>
        <div onClick={addItemHandler}>&#10095;</div>
      </QuantityContainer>
      <FieldText>{price}</FieldText>
      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
}
