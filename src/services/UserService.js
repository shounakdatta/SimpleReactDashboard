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

export function createUser(userObj) {
  const { email, password } = userObj;
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(({ code, message }) => ({ errorCode: code, message }));
}

export function updateUser(userObj) {
  return firebase
    .auth()
    .currentUser.updateProfile(userObj)
    .catch(({ code, message }) => ({ errorCode: code, message }));
}

export function getUser() {
  return firebase.auth().currentUser;
}

export function resetUserPassword(email) {
  return firebase.auth().sendPasswordResetEmail(email);
}
