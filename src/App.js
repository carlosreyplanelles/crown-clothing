import { Routes, Route } from "react-router-dom";

import { useEffect } from "react";
import {
  createUserDoc,
  onAuthStateChangedHandler,
} from "./utils/firebase/firebase.utils";

import Home from "./routes/home/home.component";
import NavigationBar from "./routes/navigationBar/navigationBar.component";
import Shop from "./routes/shop/shop.component";
import Authentication from "./routes/authentication/authentication.component";
import { Checkout } from "./routes/checkout/checkout.component";
import { setCurrentUser } from "./store/user/user.action";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChangedHandler((user) => {
      if (user) {
        //DisplayName Option 1 - Create a new document into a database collection to add the displaName info
        createUserDoc(user);
      }
      /*DisplayName option 2 - sent the display name for the user that has been created through the form
      user.displayName = displayName;*/
      dispatch(setCurrentUser(user));
      return unsubscribe;
    });
  }, []);
  return (
    <Routes>
      <Route path="/" element={<NavigationBar />}>
        <Route index element={<Home />} />
        <Route path="/shop/*" element={<Shop />} />
        <Route path="/auth" element={<Authentication />} />
        <Route path="/checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
