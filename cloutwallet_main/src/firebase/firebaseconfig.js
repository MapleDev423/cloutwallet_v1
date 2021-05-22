import firebase from "firebase";
var firebaseConfig = {
  /*
  apiKey: "AIzaSyAsPZHO8nvspeBfFG25ZIP15jSWJXngDBs",
  authDomain: "kong-3418f.firebaseapp.com",
  databaseURL: "https://kong-3418f-default-rtdb.firebaseio.com",
  projectId: "kong-3418f",
  storageBucket: "kong-3418f.appspot.com",
  messagingSenderId: "587358937381",
  appId: "1:587358937381:web:2b2609d6388c057637facc",
  measurementId: "G-W99ZNN6DEB"
  */

  apiKey: "AIzaSyDmRLCYmnFH4SRGrjQVllTJCHGhW7-r4QI",
  authDomain: "cloutwallet-price-tracker.firebaseapp.com",
  projectId: "cloutwallet-price-tracker",
  storageBucket: "cloutwallet-price-tracker.appspot.com",
  messagingSenderId: "949320661550",
  appId: "1:949320661550:web:82a35b93c2298d68fbfdbf",
  measurementId: "G-1ZY7CFJK95",
};
let firebaseApp = null;
if (firebase.apps.length === 0) {
  firebaseApp = firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

export default db;
