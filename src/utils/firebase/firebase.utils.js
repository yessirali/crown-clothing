import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB4dArYAvN47gaToi7Y9GHszB0Z7RJh_Y4",
  authDomain: "crwn-clothing-db-3e06c.firebaseapp.com",
  projectId: "crwn-clothing-db-3e06c",
  storageBucket: "crwn-clothing-db-3e06c.appspot.com",
  messagingSenderId: "149612457643",
  appId: "1:149612457643:web:8e023f807df4276f6a11ee",
  measurementId: "G-X5F7B4KFF3",
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

/*
So this single instance allows us now to tell Firebase when we want to get a document or we want
to set a document or anything like that related to our database.
This is the database that we're going to pass because this actually directly points to our database
inside of the console.
*/
export const db = getFirestore();

// Get the data which we get from authentication and store that in firestore
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = ""
) => {
  /*
    The second is going to be collection, so we know we're going to call it our users collections.
And then third is going to be some identifier that tells it what it was.
So do you remember?
Well, I showed you in our slideshow in the last video and I showed you the identifier was Nike Air
Max or Adidas.
NMD capitalized.
And altogether, if you remember, it looks something like this Nike Air Max like that, that identifier
is a unique ID.
So similarly, we need a unique ID for this to work.
So what is our unique ID?
    */
  // uid is getting from userAuth object when we sign in with google
  //   response.user = userAuth.uid
  const userDocRef = doc(db, "users", userAuth.uid);
  /*
I'm essentially saying, Hey, give me the document reference.

Inside of this database under the user's collection with this user office, UID

  */
  console.log(userDocRef);

  /*

The snapshot allows us to check whether or not there's an instance of it that exists inside of a database,
and it also allows us to access the data.

  */
  const userSnapShot = await getDoc(userDocRef);
  console.log(userSnapShot.exists());

  //if user data doesn't exits
  // create /set the document with the data from userAuth in my collection

  if (!userSnapShot.exists()) {
    //these are the fields that are in this object along with UId
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      //set data in userDocRef
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  //if users data exits

  //return userDocRef

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};
