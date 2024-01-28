import { auth, firestore } from "../firebaseConfig"; // Adjust the path as needed
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export const createUsername = async (userId: string, username: string) => {
  const userDoc = doc(firestore, "users", userId);
  await setDoc(userDoc, { username });
};

export const registerUser = async (
  email: string,
  password: string,
  username: string
) => {
  if (!username.trim()) {
    throw new Error("Username cannot be blank");
  }

  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  await createUsername(userCredential.user.uid, username);
  return userCredential;
};
