import { CATEGORIES_MAP_TYPES } from "./categories.types";
import { createAction } from "../../utils/reducers/reducers.utils";
import { useDispatch } from "react-redux";
import { getCategoriesAndDocs } from "../../utils/firebase/firebase.utils";

/*export const setCategoriesMap = (categoriesMap) => {
  return {
    type: CATEGORIES_MAP_TYPES.SET_CATEGORIES,
    payload: categoriesMap,
  };
};*/

export const fetchCategoriesStart = () => {
  return createAction(CATEGORIES_MAP_TYPES.FETCH_CATEGORIES_START);
};

export const fetchCategoriesSuccess = (categoriesMap) => {
  return createAction(
    CATEGORIES_MAP_TYPES.FETCH_CATEGORIES_SUCCESS,
    categoriesMap
  );
};

export const fetchCategoriesFailed = (error) => {
  return createAction(CATEGORIES_MAP_TYPES.FETCH_CATEGORIES_FAILED, error);
};

export const fetchCategoriesAsync = () => async (dispatch) => {
  dispatch(fetchCategoriesStart());
  try {
    const categoriesArray = await getCategoriesAndDocs("categories");
    dispatch(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    dispatch(fetchCategoriesFailed(error));
  }
};
