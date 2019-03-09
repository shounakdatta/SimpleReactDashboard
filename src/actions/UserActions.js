import {
  ON_INIT,
  ON_EXIT,
  GET_SETTINGS,
  GET_INSTANCES,
  SET_INSTANCE,
} from '../constants/ActionTypes';
import * as UserService from '../services/UserService';

export const login = (userObj) => dispatch => {
  return new Promise((resolve, reject) => {
    UserService.validateUser(userObj)
    .then(response => {
      dispatch({
        type: ON_INIT,
        payload: response.userObj,
      })
      resolve(response);
    })
    .catch((error) => {
      reject(error);
    });
  })
}

export const logout = () => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: ON_EXIT,
    });
    resolve();
  })
}

export const getSettings = () => dispatch => {
  return new Promise((resolve, reject) => {
    UserService.getSettings()
    .then(response => {
      dispatch({
        type: GET_SETTINGS,
        payload: response.settings,
      })
      resolve(response);
    })
    .catch((error) => {
      reject(error);
    });
  })
}

export const getInstances = () => dispatch => {
  return new Promise((resolve, reject) => {
    UserService.getInstances()
    .then(response => {
      dispatch({
        type: GET_INSTANCES,
        payload: response.instances,
      })
      resolve(response);
    })
    .catch((error) => {
      reject(error);
    });
  })
}

export const setInstance = (instanceObj) => dispatch => {
  return new Promise((resolve, reject) => {
    UserService.setInstance(instanceObj)
    .then(response => {
      dispatch({
        type: SET_INSTANCE,
        payload: instanceObj,
      })
      resolve(response);
    })
    .catch((error) => {
      reject(error);
    });
  })
}
