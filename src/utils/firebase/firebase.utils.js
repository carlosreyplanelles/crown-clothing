import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUJXx-1MLH2Obc3cs8BXB_0d3Xxzw4XB8",
  authDomain: "crwn-clothing-db-6964c.firebaseapp.com",
  projectId: "crwn-clothing-db-6964c",
  storageBucket: "crwn-clothing-db-6964c.appspot.com",
  messagingSenderId: "260449982135",
  appId: "1:260449982135:web:710a329ce38fddf4bedf32",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize googleAuth
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopUp = () =>
  signInWithPopup(auth, googleProvider);

export const db = getFirestore();

//Create a new collection
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  //retrieve/create the collection
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);
  //Add the documents in the collection
  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

export const getCategoriesAndDocs = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);
  const querySnapShot = await getDocs(q);
  const categoryMap = querySnapShot.docs.reduce((acc, category) => {
    const { title, items } = category.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});
  console.log("CategoryMap:" + categoryMap);
  return categoryMap;
};

export const createUserDoc = async (userAuth, additionalInfo = {}) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);
  const userDocData = await getDoc(userDocRef);

  if (!userDocData.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      console.log(userAuth);
      setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo,
      });
    } catch (error) {
      console.log(error.message);
    }
  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPaswsword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const validateAuthUserWithEmailAndPaswsword = async (
  email,
  password
) => {
  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    return userCred;
  } catch (e) {
    switch (e.code) {
      case "auth/invalid-credential":
        alert("Email/password is invalid");
        break;
      default:
        console.log(e);
    }
  }
};

export const onAuthStateChangedHandler = (callback) =>
  onAuthStateChanged(auth, callback);

export const SignOutHandler = async () => {
  return await signOut(auth);
};
