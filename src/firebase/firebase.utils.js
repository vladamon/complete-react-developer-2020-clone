import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyA0fHpG2Ox7vreFdsWET4GKY5SwyN6HThM",
  authDomain: "crown-db-c77eb.firebaseapp.com",
  databaseURL: "https://crown-db-c77eb.firebaseio.com",
  projectId: "crown-db-c77eb",
  storageBucket: "crown-db-c77eb.appspot.com",
  messagingSenderId: "469083055810",
  appId: "1:469083055810:web:597dc905e282f066"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
