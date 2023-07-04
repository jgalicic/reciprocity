// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAjBcdjtf6Sk7GI-P2Gu-VdTx7JY5p2ysw',
  authDomain: 'reciprocity2022-1e2e9.firebaseapp.com',
  projectId: 'reciprocity2022-1e2e9',
  storageBucket: 'reciprocity2022-1e2e9.appspot.com',
  messagingSenderId: '1028282605704',
  appId: '1:1028282605704:web:602e6aba0fe86a72cf3f3d'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore }




