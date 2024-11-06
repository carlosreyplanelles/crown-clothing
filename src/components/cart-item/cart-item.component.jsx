import {
  CartItemContainer,
  ItemImage,
  ItemDetails,
  Name,
} from "./cart-item.styles";

export function CartItem({ cartItem }) {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <CartItemContainer>
      <img src={imageUrl} alt={name} />
      <ItemDetails>
        <Name>{name}</Name>
        <span>
          {quantity} x {price}€
        </span>
      </ItemDetails>
    </CartItemContainer>
  );
}
