import { ON_INIT, ON_EXIT, ON_VALIDATE } from "../constants/ActionTypes";
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
      .then(response => {
        dispatch({
          type: ON_VALIDATE,
          payload: response.user
        });
        resolve(response);
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
