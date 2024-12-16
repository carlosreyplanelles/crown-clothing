import { createSelector } from "reselect";

const categoriesArrayMemoSelector = (state) => state.categories;

export const selectCategoriesMap = createSelector(
  [categoriesArrayMemoSelector],
  (categoriesReducer) => {
    console.log("selector triggered");
    return categoriesReducer.categoriesArray.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});
  }
);
