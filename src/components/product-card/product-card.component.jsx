import {
  ProductCardContainer,
  Footer,
  Name,
  Price,
} from "./product-card.styles";
import { Button, BUTTON_TYPE_CLASSES } from "../button/button.component";
import { CartContext } from "../../contexts/cart.context";
import { useContext } from "react";

export function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const { name, price, imageUrl } = product;
  const addPorductToCart = () => {
    addToCart(product);
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
