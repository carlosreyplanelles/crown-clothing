import { createContext, useState, useEffect } from "react";
import { getCategoriesAndDocs } from "../utils/firebase/firebase.utils.js";

import SHOP_DATA from "../shop-data.js";

export const CategoriesContext = createContext({
  categoriesMap: {},
  setCategoriesMap: () => null,
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});
  const value = { categoriesMap, setCategoriesMap };
  useEffect(() => {
    //ALWAYS WRAP ASYNC CALLS INTO USE EFFECT IN A LOCAL VARIABLE!!!
    const getCategoriesMap = async () => {
      const categoriesMap = await getCategoriesAndDocs();
      setCategoriesMap(categoriesMap);
    };
    getCategoriesMap();
  }, []);

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
