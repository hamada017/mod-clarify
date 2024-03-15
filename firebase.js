// Import the functions you need from the SDKs you need
/*import { initializeApp } from 'firebase/app';
import 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLDOdAmYOMa0h2HN7avlcmr7Au8Gk5y20",
  authDomain: "clarify-9d4fc.firebaseapp.com",
  projectId: "clarify-9d4fc",
  storageBucket: "clarify-9d4fc.appspot.com",
  messagingSenderId: "360005657651",
  appId: "1:360005657651:web:c53c32e4653af16b952f46"
};

// Initialize Firebase





//

import { initializeApp } from 'firebase/app';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {

  apiKey: "AIzaSyDLDOdAmYOMa0h2HN7avlcmr7Au8Gk5y20",
  authDomain: "clarify-9d4fc.firebaseapp.com",
  projectId: "clarify-9d4fc",
  storageBucket: "clarify-9d4fc.appspot.com",
  messagingSenderId: "360005657651",
  appId: "1:360005657651:web:c53c32e4653af16b952f46"
  //...
};

const app = initializeApp(firebaseConfig);
const auth = app.auth();

export { auth };

*/

// import { initializeApp } from "firebase/app";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import "@firebase/firestore";

//================teg
// import { initializeApp } from "firebase/compat/app";
// import { getAuth } from "firebae/compat/auth";
// import "@firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDLDOdAmYOMa0h2HN7avlcmr7Au8Gk5y20",
  authDomain: "clarify-9d4fc.firebaseapp.com",
  projectId: "clarify-9d4fc",
  storageBucket: "clarify-9d4fc.appspot.com",
  messagingSenderId: "360005657651",
  appId: "1:360005657651:web:c53c32e4653af16b952f46",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;

// IOS: 360005657651-dvncntc2k0ef2deu0um9rlmin9s76ec4.apps.googleusercontent.com
// Android : 360005657651-0oeq6lra4hq8f36ml3mn7rsnuougta5i.apps.googleusercontent.com
