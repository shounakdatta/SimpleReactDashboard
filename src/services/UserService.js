import firebase from "../config/Fire";

export function loginUser(userObj) {
  const { email, password } = userObj;
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(({ code, message }) => ({ errorCode: code, message }));
}

export function validateUser() {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      unsubscribe();
      if (user) resolve(user);
      else reject("User is not logged in or has timed out");
    });
  });
}

export function logoutUser() {
  return firebase
    .auth()
    .signOut()
    .catch(({ code, message }) => ({ errorCode: code, message }));
}
