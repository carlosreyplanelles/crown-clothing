import { ProductCard } from "../product-card/product-card.component";
import {
  Title,
  Preview,
  CategoryPreviewContainer,
} from "./category-preview.styles";

export function CategoryPreview({ title, products }) {
  return (
    <CategoryPreviewContainer>
      <h2>
        <Title to={title}>{title.toUpperCase()}</Title>
      </h2>
      <Preview>
        {products
          .filter((_, idx) => idx < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </Preview>
    </CategoryPreviewContainer>
  );
}
