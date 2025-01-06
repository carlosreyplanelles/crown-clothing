import { CATEGORIES_MAP_TYPES } from "./categories.types";

const INITIAL_STATE = {
  categoriesArray: [],
  isLoading: false,
  error: null,
};

export const categoriesReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    /*case CATEGORIES_MAP_TYPES.SET_CATEGORIES:
      return { ...state, categoriesArray: payload };*/
    case CATEGORIES_MAP_TYPES.FETCH_CATEGORIES_START:
      return { ...state, isLoading: true };
    case CATEGORIES_MAP_TYPES.FETCH_CATEGORIES_SUCCESS:
      return { ...state, isLoading: false, categoriesArray: payload };
    case CATEGORIES_MAP_TYPES.FETCH_CATEGORIES_FAILED:
      return { ...state, isLoading: false, error: payload };
    default:
      return state;
  }
};
