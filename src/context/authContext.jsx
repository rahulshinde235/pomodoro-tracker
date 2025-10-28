import { useContext } from "react";
import { useState, createContext, useEffect } from "react";
import {
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { getDoc, doc } from "firebase/firestore";
import {
  loadDataIntoLocalStorage,
  removeDataFromLocalStorage,
} from "../utils/localStorageHelpers";
import { toast } from "react-toastify";

import { createUserIfNotExists } from "../firebase/createUserIfNotExists";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [userDoc, setUserDoc] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setAuthUser(currentUser);
        const docRef = doc(db, "users", currentUser.uid);
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
          setUserDoc(docSnapshot.data());
        }
      } else {
        setAuthUser(null);
        setUserDoc(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (authUser) {
      loadDataIntoLocalStorage("user", authUser);
    } else {
      removeDataFromLocalStorage("user");
    }
  }, [authUser]);

  async function logout() {
    try {
      await signOut(auth);
      setAuthUser(null);
      setUserDoc(null);
      toast.success("Logged out successfully", {
        position: "top-right",
      });
    } catch (error) {
      toast.error("Logout failed, please try again");
      console.error(error);
    }
  }

  async function login() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const { user } = result;
      if (user) {
        await createUserIfNotExists(user);
        toast.success("User logged in successfully", {
          position: "top-right",
        });
        return user;
      }
    } catch (error) {
      console.error("Google signin failed", error);
      toast.error("Login failed, try again please.");
    }
  }

  return (
    <AuthContext.Provider value={{ authUser, userDoc, loading, logout, login }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
