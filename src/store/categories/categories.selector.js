import { createSelector } from "reselect";

const categoriesReducerMemoSelector = (state) => state.categories;

const categoriesArrayMemoSelector = createSelector(
  [categoriesReducerMemoSelector],
  (categoriesReducer) => categoriesReducer.categoriesArray
);

export const selectCategoriesMap = createSelector(
  [categoriesArrayMemoSelector],
  (categoriesArray) => {
    console.log("selector triggered");
    return categoriesArray.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});
  }
);

export const selectCategoriesIsLoading = createSelector(
  [categoriesReducerMemoSelector],
  (categoriesReducer) => categoriesReducer.isLoading
);
