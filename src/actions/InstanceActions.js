import {
  GET_ROLES,
  SAVE_ROLE,
  DELETE_ROLE,
  GET_LANG,
  EDIT_SCREEN,
  DELETE_SCREEN,
  EDIT_VIEW,
  DELETE_VIEW,
  EDIT_CONTENT,
  SAVE_LANG,
} from '../constants/ActionTypes';
import * as InstanceService from '../services/InstanceService';

export const getRoles = () => dispatch => {
  return new Promise((resolve, reject) => {
    InstanceService.getSecurityRoles()
    .then(response => {
      dispatch({
        type: GET_ROLES,
        payload: response.securityRoles,
      })
      resolve(response);
    })
    .catch((error) => {
      reject(error);
    });
  })
}

export const saveRole = (roleObj) => dispatch => {
  return new Promise((resolve, reject) => {
    InstanceService.saveRole(roleObj)
    .then(response => {
      dispatch({
        type: SAVE_ROLE,
        payload: { ...roleObj, role_id: response.newRoleId },
      })
      resolve(response);
    })
    .catch((error) => {
      reject(error);
    });
  })
}

export const deleteRole = (roleId) => dispatch => {
  return new Promise((resolve, reject) => {
    InstanceService.deleteRole(roleId)
    .then(response => {
      dispatch({
        type: DELETE_ROLE,
        payload: roleId,
      })
      resolve(response);
    })
    .catch((error) => {
      reject(error);
    });
  })
}

export const getLangObj = () => dispatch => {
  return new Promise((resolve, reject) => {
    InstanceService.getLangObj()
    .then((response) => {
      dispatch({
        type: GET_LANG,
        payload: {
          langViews: response.langViews,
          version: response.version
        }
      })
      resolve(response);
    })
    .catch((error) => {
      reject(error);
    });
  })
}

export const editScreen = (oldScreenName, newScreenName) => dispatch => {
  return new Promise((resolve) => {
    dispatch({
      type: EDIT_SCREEN,
      payload: { oldScreenName, newScreenName }
    });
    resolve();
  });
}

export const deleteScreen = (screenName) => dispatch => {
  return new Promise((resolve) => {
    dispatch({
      type: DELETE_SCREEN,
      payload: screenName
    });
    resolve();
  });
}

export const editView = (
    selectedScreen,
    oldViewName,
    newViewName
  ) => dispatch => {
  return new Promise((resolve) => {
    dispatch({
      type: EDIT_VIEW,
      payload: { selectedScreen, oldViewName, newViewName }
    });
    resolve();
  });
}

export const deleteView = (screenName, viewName) => dispatch => {
  return new Promise((resolve) => {
    dispatch({
      type: DELETE_VIEW,
      payload: { screenName, viewName }
    });
    resolve();
  });
}

export const editContent = (
    selectedScreen,
    selectedView,
    viewContent
  ) => dispatch => {
  return new Promise((resolve) => {
    dispatch({
      type: EDIT_CONTENT,
      payload: { selectedScreen, selectedView, viewContent }
    });
    resolve();
  });
}

export const saveLang = (langObj) => dispatch => {
  return new Promise((resolve, reject) => {
    InstanceService.saveLangObj(langObj)
    .then((response) => {
      dispatch({
        type: SAVE_LANG,
        payload: langObj.version
      })
      resolve(response);
    })
    .catch((error) => {
      reject(error);
    });
  })
}
