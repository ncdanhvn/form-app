import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore, auth } from "../firebaseConfig";

export const addFormToUser = async (userId: string, formId: string) => {
  const userDocRef = doc(firestore, "users", userId);
  await updateDoc(userDocRef, {
    formIds: arrayUnion(formId),
  });
};

export const getUserFormsList = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("No authenticated user found");

  const userDocRef = doc(firestore, "users", user.uid);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    const userData = userDocSnap.data();
    return userData.formIds || []; // Return the formIds array or an empty array if it doesn't exist
  } else {
    throw new Error("User document does not exist");
  }
};

export const getUsername = async (userUid: string) => {
  try {
    const userRef = doc(firestore, "users", userUid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data().username;
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching username:", error);
    return null;
  }
};
