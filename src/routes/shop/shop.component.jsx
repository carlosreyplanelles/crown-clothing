import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import CategoriesPreview from "../categories-preview/categories-preview.component";
import { Category } from "../category/category.component";
import { getCategoriesAndDocs } from "../../utils/firebase/firebase.utils";
import { setCategoriesMap } from "../../store/categories/categories.action";

export default function Shop() {
  const dispatch = useDispatch();
  useEffect(() => {
    //ALWAYS WRAP ASYNC CALLS INTO USE EFFECT IN A LOCAL VARIABLE!!!
    const getCategoriesMap = async () => {
      const categoriesArray = await getCategoriesAndDocs();
      dispatch(setCategoriesMap(categoriesArray));
    };
    getCategoriesMap();
  }, []);
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
}
