import { useContext } from "react";
import {
  CheckoutItemContainer,
  ImageContainer,
  FieldText,
  QuantityContainer,
  RemoveButton,
} from "./checkout-card.styles";
import { CartContext } from "../../contexts/cart.context";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeCartItem,
  removeCartItemFromBasket,
} from "../../store/cart/cart.action.js";

export function CheckoutCard({ cartItem, decreaseHandler }) {
  const dispatch = useDispatch();
  const { name, quantity, price, imageUrl } = cartItem;
  const cartItems = useSelector((state) => state.cart.cartItems);

  const addItemHandler = () => {
    dispatch(addToCart(cartItems, cartItem));
  };
  const removeItemHandler = () => {
    dispatch(removeCartItem(cartItems, cartItem));
  };
  const clearItemHandler = () => {
    dispatch(removeCartItemFromBasket(cartItems, cartItem));
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
