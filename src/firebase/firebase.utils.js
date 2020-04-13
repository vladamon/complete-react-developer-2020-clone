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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) {
    return;
  }

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    try {
      await userRef.set({
        displayName: userAuth.displayName,
        email: userAuth.email,
        createdAt: new Date(),
        ...additionalData
      })
    } catch (ex) {
      console.log(ex.toString());
    }
  }

  console.log(userAuth);

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
