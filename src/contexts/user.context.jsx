import { createContext, useReducer, useEffect } from "react";
import {
  createUserDoc,
  onAuthStateChangedHandler,
} from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};

const UserReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_CURRENT_USER":
      return {
        ...state,
        currentUser: payload,
      };
    default:
      throw new Error(`Unhandeled type ${type} in UserReducer`);
  }
};

const INITIAL_STATE = {
  currentUser: null,
};

export const UserProvider = ({ children }) => {
  //const [currentUser, setCurrentUser] = useState(null);
  const [{ currentUser }, dispatcher] = useReducer(UserReducer, INITIAL_STATE);

  const setCurrentUser = (user) => {
    dispatcher({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user });
  };

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
