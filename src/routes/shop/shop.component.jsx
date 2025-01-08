import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import CategoriesPreview from "../categories-preview/categories-preview.component";
import { Category } from "../category/category.component";
import { getCategoriesAndDocs } from "../../utils/firebase/firebase.utils";
import { fetchCategoriesStart } from "../../store/categories/categories.action";

export default function Shop() {
  const dispatch = useDispatch();

  useEffect(() => {
    //ALWAYS WRAP ASYNC CALLS INTO USE EFFECT IN A LOCAL VARIABLE!!!(in case you are not using redux thunk)
    dispatch(fetchCategoriesStart());
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
}
