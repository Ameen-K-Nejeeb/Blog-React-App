import { createContext, useEffect, useMemo, useState } from "react";
import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebase";

const AuthContext = createContext(null);

const getAuthErrorMessage = (error) => {
  switch (error?.code) {
    case "auth/email-already-in-use":
      return "This email is already registered.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/invalid-credential":
    case "auth/user-not-found":
    case "auth/wrong-password":
      return "The email or password is incorrect.";
    case "auth/weak-password":
      return "Password should be at least 6 characters.";
    default:
      return error?.message || "Something went wrong. Please try again.";
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    let unsubscribe = () => {};

    const initializeAuth = async () => {
      try {
        await setPersistence(auth, browserLocalPersistence);
      } catch (error) {
        console.error("Failed to set auth persistence:", error);
      }

      unsubscribe = onAuthStateChanged(auth, (nextUser) => {
        setUser(nextUser);
        setAuthLoading(false);
      });
    };

    initializeAuth();

    return () => unsubscribe();
  }, []);

  const value = useMemo(
    () => ({
      user,
      authLoading,
      signUp: async (email, password) => {
        try {
          return await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
          throw new Error(getAuthErrorMessage(error));
        }
      },
      signIn: async (email, password) => {
        try {
          return await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
          throw new Error(getAuthErrorMessage(error));
        }
      },
      signOutUser: async () => {
        try {
          await signOut(auth);
        } catch (error) {
          throw new Error(getAuthErrorMessage(error));
        }
      },
    }),
    [user, authLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
