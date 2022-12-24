import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const lastYearTimeSpentFullInit = {
  1: {
    w1: [0, 0, 0, 0, 0, 0, 0],
    w2: [0, 0, 0, 0, 0, 0, 0],
    w3: [0, 0, 0, 0, 0, 0, 0],
    w4: [0, 0, 0, 0, 0, 0, 0],
  },
  2: {
    w1: [0, 0, 0, 0, 0, 0, 0],
    w2: [0, 0, 0, 0, 0, 0, 0],
    w3: [0, 0, 0, 0, 0, 0, 0],
    w4: [0, 0, 0, 0, 0, 0, 0],
  },
  3: {
    w1: [0, 0, 0, 0, 0, 0, 0],
    w2: [0, 0, 0, 0, 0, 0, 0],
    w3: [0, 0, 0, 0, 0, 0, 0],
    w4: [0, 0, 0, 0, 0, 0, 0],
  },
  4: {
    w1: [0, 0, 0, 0, 0, 0, 0],
    w2: [0, 0, 0, 0, 0, 0, 0],
    w3: [0, 0, 0, 0, 0, 0, 0],
    w4: [0, 0, 0, 0, 0, 0, 0],
  },
  5: {
    w1: [0, 0, 0, 0, 0, 0, 0],
    w2: [0, 0, 0, 0, 0, 0, 0],
    w3: [0, 0, 0, 0, 0, 0, 0],
    w4: [0, 0, 0, 0, 0, 0, 0],
  },
  6: {
    w1: [0, 0, 0, 0, 0, 0, 0],
    w2: [0, 0, 0, 0, 0, 0, 0],
    w3: [0, 0, 0, 0, 0, 0, 0],
    w4: [0, 0, 0, 0, 0, 0, 0],
  },
  7: {
    w1: [0, 0, 0, 0, 0, 0, 0],
    w2: [0, 0, 0, 0, 0, 0, 0],
    w3: [0, 0, 0, 0, 0, 0, 0],
    w4: [0, 0, 0, 0, 0, 0, 0],
  },
  8: {
    w1: [0, 0, 0, 0, 0, 0, 0],
    w2: [0, 0, 0, 0, 0, 0, 0],
    w3: [0, 0, 0, 0, 0, 0, 0],
    w4: [0, 0, 0, 0, 0, 0, 0],
  },
  9: {
    w1: [0, 0, 0, 0, 0, 0, 0],
    w2: [0, 0, 0, 0, 0, 0, 0],
    w3: [0, 0, 0, 0, 0, 0, 0],
    w4: [0, 0, 0, 0, 0, 0, 0],
  },
  10: {
    w1: [0, 0, 0, 0, 0, 0, 0],
    w2: [0, 0, 0, 0, 0, 0, 0],
    w3: [0, 0, 0, 0, 0, 0, 0],
    w4: [0, 0, 0, 0, 0, 0, 0],
  },
  11: {
    w1: [0, 0, 0, 0, 0, 0, 0],
    w2: [0, 0, 0, 0, 0, 0, 0],
    w3: [0, 0, 0, 0, 0, 0, 0],
    w4: [0, 0, 0, 0, 0, 0, 0],
  },
  12: {
    w1: [0, 0, 0, 0, 0, 0, 0],
    w2: [0, 0, 0, 0, 0, 0, 0],
    w3: [0, 0, 0, 0, 0, 0, 0],
    w4: [0, 0, 0, 0, 0, 0, 0],
  },
};
const coursesInit = {
  coursesEnrolled: [
    {
      courseName: "App Development",
      courseID: 2,
      activelyTaking: false,
      taskCompleted: [1, 3],
      instructors: [
        {
          name: "Ryan Tompson",
          image: "https://huzaifa3165.github.io/dashboard-assets/images/avatar1.png",
        },
        {
          name: "Romina Hadid",
          image: "https://huzaifa3165.github.io/dashboard-assets/images/avatar2.png",
        },
        {
          name: "Alexander Smith",
          image: "https://huzaifa3165.github.io/dashboard-assets/images/avatar3.png",
        },
        {
          name: "Jessica Doe",
          image: "https://huzaifa3165.github.io/dashboard-assets/images/avatar4.png",
        },
      ],
      students: 900,
    },
  ],
  subscribedToNewsletter: false,
  posts: [],
  rewards: [],
};

const config = {
  apiKey: "AIzaSyBYWY4wEm-UarEgN6I4hFhYqh6Ke5O8Kq4",
  authDomain: "huzend-1.firebaseapp.com",
  projectId: "huzend-1",
  storageBucket: "huzend-1.appspot.com",
  messagingSenderId: "564437786963",
  appId: "1:564437786963:web:14d13188bad4333b4701a6",
  measurementId: "G-K2NZ91E1GM",
};

firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const createNewUserIfExist = async (authenticatedUser, additional) => {
  const userRef = firestore.doc(`users/${authenticatedUser.uid}`);
  const snapShot = await userRef.get();
  console.log("This is snapshot", snapShot);
  if (!snapShot.exists) {
    const { displayName, email, photoURL } = authenticatedUser;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        timeSpentToday: 0,
        courses: coursesInit,
        photoURL: photoURL
          ? photoURL
          : "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/microsoft/319/robot_1f916.png",
        lastYearTimeSpentFull: lastYearTimeSpentFullInit,
        blogsTraffic: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        rewards: [2],
        ...additional,
      });
    } catch (error) {
      console.log("Error in adding Email to Database\n", error);
    }
  }
  return userRef;
};

export const addCollectionsAndDocuments = async (collectionName, collectionObj) => {
  const collectionsRef = firestore.collection(collectionName);
  const snapShotCol = await collectionsRef.get();
  if (snapShotCol.empty) {
    const batch = firestore.batch();
    collectionObj.forEach((obj) => {
      const newDocRef = collectionsRef.doc();
      batch.set(newDocRef, obj);
    });
    const data = await batch.commit();
    console.log(data);
    return data;
  }
};

export const mapCollectionsToObject = async (snapShotCol) => {
  if (snapShotCol) {
    const collectionArray = snapShotCol.docs.map((document) => {
      const { title, items } = Object.values(document.data())[0];
      return {
        routeName: encodeURI(title.toLowerCase()),
        id: document.id,
        title,
        items,
      };
    });
    const collectionsDataObject = collectionArray.reduce((accumulator, collection) => {
      accumulator[collection.title.toLowerCase()] = collection;
      return accumulator;
    }, {});
    return collectionsDataObject;
  }
};

export const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  return auth.signInWithPopup(provider);
};

export const signInWithFacebook = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  provider.setCustomParameters({ display: "popup" });
  return auth.signInWithPopup(provider);
};

export const signInWithGithub = () => {
  const provider = new firebase.auth.GithubAuthProvider();
  return auth.signInWithPopup(provider);
};
export default firebase;
