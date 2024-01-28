import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebaseConfig";

export const addFormToUser = async (userId: string, formId: string) => {
  const userDocRef = doc(firestore, "users", userId);
  await updateDoc(userDocRef, {
    formIds: arrayUnion(formId),
  });
};
