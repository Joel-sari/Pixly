//OUR CONTEXT API

import { auth } from "@/firebaseconfig";
import {
  User,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";

import { createContext, useContext, useEffect, useState } from "react";

// This inerface will have a prop called children with type react node
interface IUserAuthProviderProps {
  children: React.ReactNode;
}

// This context data is what will be ethe data exported from here and be used by all of our components
type AuthContextData = {
  user: User | null;
  logIn: typeof logIn;
  signUp: typeof signUp;
  logOut: typeof logOut;
  googleSignIn: typeof googleSignIn;
};
const logIn = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const signUp = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};
const logOut = () => {
  return signOut(auth);
};
const googleSignIn = () => {
  const googleAuthProvider = new GoogleAuthProvider();
  return signInWithPopup(auth, googleAuthProvider);
};

export const userAuthContext = createContext<AuthContextData>({
  user: null,
  logIn,
  signUp,
  logOut,
  googleSignIn,
});
export const UserAuthProvider: React.FunctionComponent<
  IUserAuthProviderProps
> = ({ children }) => {
  // Combo of useState and UseEffect will dictate the user information and store it
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("The logged in user state is: ", user);
        setUser(user);
      }
      return () => {
        unsubscribe();
      };
    });
  });

  const value: AuthContextData = {
    user,
    logIn,
    signUp,
    logOut,
    googleSignIn,
  };
  return (
    <userAuthContext.Provider value={value}>
      {children}
    </userAuthContext.Provider>
  );
};

export const useUserAuth = () => {
  return useContext(userAuthContext);
};
