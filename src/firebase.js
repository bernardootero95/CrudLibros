// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFireStore} from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSlFoS3gQ419co4n6T1q7xBP3_bjYiDkQ",
  authDomain: "crudlibros-48f35.firebaseapp.com",
  databaseURL: "https://crudlibros-48f35-default-rtdb.firebaseio.com",
  projectId: "crudlibros-48f35",
  storageBucket: "crudlibros-48f35.appspot.com",
  messagingSenderId: "1031847455918",
  appId: "1:1031847455918:web:390cd23fb600507ea5113f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db  = getFireStore(app);
export {db};