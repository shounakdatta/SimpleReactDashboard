import {
  ON_INIT,
  ON_EXIT,
  ON_VALIDATE,
  ON_CREATE_USER,
  ON_UPDATE_USER,
  ON_FORGOT_PASSWORD,
  ON_PASSWORD_RESET
} from "../constants/ActionTypes";
import * as UserService from "../services/UserService";

export const login = userObj => dispatch => {
  return new Promise((resolve, reject) => {
    UserService.loginUser(userObj)
      .then(response => {
        dispatch({
          type: ON_INIT,
          payload: response.user
        });
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const validateUser = () => dispatch => {
  return new Promise((resolve, reject) => {
    UserService.validateUser()
      .then(user => {
        dispatch({
          type: ON_VALIDATE,
          payload: user
        });
        resolve(user);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const logout = () => dispatch => {
  return new Promise((resolve, reject) => {
    UserService.logoutUser()
      .then(() => {
        dispatch({
          type: ON_EXIT
        });
        resolve();
      })
      .catch(error => reject(error));
  });
};

export const create = userObj => dispatch => {
  return new Promise((resolve, reject) => {
    const { displayName, email, password } = userObj;
    UserService.createUser({ email, password })
      .then(() => {
        UserService.updateUser({ displayName })
          .then(() => {
            const user = UserService.getUser();
            dispatch({
              type: ON_CREATE_USER,
              payload: user
            });
            resolve({ user });
          })
          .catch(error => reject(error));
      })
      .catch(error => reject(error));
  });
};

export const update = userObj => dispatch => {
  return new Promise((resolve, reject) => {
    UserService.updateUser(userObj)
      .then(response => {
        dispatch({
          type: ON_UPDATE_USER,
          payload: response.user
        });
        resolve(response);
      })
      .catch(error => reject(error));
  });
};

export const forgotPassword = email => dispatch => {
  return new Promise((resolve, reject) => {
    UserService.forgotUserPassword(email)
      .then(() => {
        dispatch({
          type: ON_FORGOT_PASSWORD
        });
        resolve({ success: true, message: "A password reset email was sent." });
      })
      .catch(error => reject(error));
  });
};

export const resetPassword = verificationObj => dispatch => {
  return new Promise((resolve, reject) => {
    UserService.resetUserPassword(verificationObj)
      .then(() => {
        dispatch({
          type: ON_PASSWORD_RESET
        });
        resolve({ success: true, message: "Your password has been reset." });
      })
      .catch(error => reject(error));
  });
};
