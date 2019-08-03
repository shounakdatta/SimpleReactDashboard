import firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8zpMJjCdgJOS4jRA4VX-5g9VlFde2oqk",
  authDomain: "pricetracker-b7847.firebaseapp.com",
  databaseURL: "https://pricetracker-b7847.firebaseio.com",
  projectId: "pricetracker-b7847",
  storageBucket: "",
  messagingSenderId: "868808958925",
  appId: "1:868808958925:web:b6926952e1fd568e"
};

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

// Export Firebase
export default fire;
