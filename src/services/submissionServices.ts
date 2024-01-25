import {
  DocumentData,
  addDoc,
  collection,
  doc,
  getDocs,
  query,
} from "firebase/firestore";
import { firestore } from "../firebaseConfig";
import { Answer } from "../types/answer";

export const saveAnswers = async (formUid: string, answers: Answer[]) => {
  try {
    const submissionDocRef = doc(firestore, "submission", formUid);
    const answersCollectionRef = collection(submissionDocRef, "answers");

    // Transform the array of answers into an object
    const answersObject = answers.reduce((obj, item) => {
      obj[item.questionUid] = item.value;
      return obj;
    }, {} as { [questionUid: string]: string | string[] });
    answersObject.createdTime = new Date().toUTCString();

    const docRef = await addDoc(answersCollectionRef, answersObject);
    console.log("Answer document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding answer document: ", e);
    throw e;
  }
};

export const loadSubmissions = async (formUid: string) => {
  const submissionsRef = collection(
    firestore,
    "submission",
    formUid,
    "answers"
  );
  const submissionsQuery = query(submissionsRef);
  const submissionsSnapshot = await getDocs(submissionsQuery);
  const submissions: { id: string; data: DocumentData; createdTime: string }[] =
    [];
  submissionsSnapshot.forEach((doc) => {
    submissions.push({
      id: doc.id,
      data: doc.data(),
      createdTime: doc.data().createdTime,
    });
  });
  return submissions;
};
