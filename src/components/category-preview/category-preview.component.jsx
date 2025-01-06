import { useSelector } from "react-redux";
import { selectCategoriesIsLoading } from "../../store/categories/categories.selector";
import { ProductCard } from "../product-card/product-card.component";
import {
  Title,
  Preview,
  CategoryPreviewContainer,
} from "./category-preview.styles";

import Spinner from "../spinner/spinner.component";
import { Fragment } from "react";

export function CategoryPreview({ title, products }) {
  const isLoading = useSelector(selectCategoriesIsLoading);
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
