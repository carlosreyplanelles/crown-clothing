import {
  ProductCardContainer,
  Footer,
  Name,
  Price,
} from "./product-card.styles";
import { Button, BUTTON_TYPE_CLASSES } from "../button/button.component";
import { CartContext } from "../../contexts/cart.context";
import { useContext } from "react";
import { addToCart } from "../../store/cart/cart.action";
import { useDispatch, useSelector } from "react-redux";

export function ProductCard({ product }) {
  const dispatch = useDispatch();
  const { name, price, imageUrl } = product;
  const cartItems = useSelector((state) => state.cart.cartItems);
  const addPorductToCart = () => {
    dispatch(addToCart(cartItems, product));
  };
  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={`${name}`} />
      <Footer>
        <Name>{name}</Name>
        <Price>{price} €</Price>
      </Footer>
      <Button
        onClick={addPorductToCart}
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        text="Add to cart"
      />
    </ProductCardContainer>
  );
}
