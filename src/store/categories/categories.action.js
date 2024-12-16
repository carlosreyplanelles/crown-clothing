import { CATEGORIES_MAP_TYPES } from "./categories.types";

export const setCategoriesMap = (categoriesMap) => {
  return {
    type: CATEGORIES_MAP_TYPES.SET_CATEGORIES,
    payload: categoriesMap,
  };
};
