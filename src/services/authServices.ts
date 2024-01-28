import { auth, firestore } from "../firebaseConfig"; // Adjust the path as needed
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const createUsername = async (userId: string, username: string) => {
  const userDoc = doc(firestore, "users", userId);
  await setDoc(userDoc, { username });
};

export const getUserUsername = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("No authenticated user found");

  const userDocRef = doc(firestore, "users", user.uid);
  const userDoc = await getDoc(userDocRef);

  if (!userDoc.exists()) {
    throw new Error("User document does not exist");
  }

  const userData = userDoc.data();
  return userData.username;
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

export const logout = async () => {
  await signOut(auth);
};
