import { useState, useEffect, Fragment } from "react";
import { CategoryContainer } from "./category.styles";
import { ProductCard } from "../../components/product-card/product-card.component";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/categories/categories.selector";

export function Category() {
  console.log("render/re-render Category");
  const categoriesMap = useSelector(selectCategoriesMap);

  const { category } = useParams();
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    console.log("Effect fired Products update");
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <h1>{category.toUpperCase()}</h1>
      <CategoryContainer>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </CategoryContainer>
    </Fragment>
  );
}
