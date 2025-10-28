import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export const createUserIfNotExists = async (user) => {
  if (!user) return;

  const userRef = doc(db, "users", user.uid);
  const userSnapshot = await getDoc(userRef);
  if (!userSnapshot.exists()) {
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      name: user.displayName,
      pomodoroDuration: 25,
      shortBreakDuration: 5,
      longBreakDuration: 15,
      longBreakInterval: 4,
      createdAt: serverTimestamp(),
    });
    console.log("User created in Firestore:", user.uid);
  } else {
    console.log("User already exists:", user.uid);
  }
};
