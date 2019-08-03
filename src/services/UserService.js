import firebase from "../config/Fire";

export function loginUser(userObj) {
  const { email, password } = userObj;
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(({ code, message }) => ({ errorCode: code, message }));
}
