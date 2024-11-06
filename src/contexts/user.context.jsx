import { createContext, useState, useEffect } from "react";
import {
  createUserDoc,
  onAuthStateChangedHandler,
} from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedHandler((user) => {
      if (user) {
        //DisplayName Option 1 - Create a new document into a database collection to add the displaName info
        createUserDoc(user);
      }
      /*DisplayName option 2 - sent the display name for the user that has been created through the form
      user.displayName = displayName;*/
      setCurrentUser(user);
      return unsubscribe;
    });
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
