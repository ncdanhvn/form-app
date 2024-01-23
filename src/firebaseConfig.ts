import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCCjG5ZP_SNY-X3zuTTknRagq39Se4uryM",
  authDomain: "new-form-7c1f8.firebaseapp.com",
  projectId: "new-form-7c1f8",
  storageBucket: "new-form-7c1f8.appspot.com",
  messagingSenderId: "616829927073",
  appId: "1:616829927073:web:c345e55faa01d3746d7ae0",
};

const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);
