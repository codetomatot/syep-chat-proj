import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  
};

initializeApp(firebaseConfig);
const analytics = getAnalytics();
const auth = getAuth();
export const db = getFirestore();

export default firebase;
