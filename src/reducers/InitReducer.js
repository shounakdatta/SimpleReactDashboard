import _ from 'lodash';
import { fromJS } from 'immutable';
import {
  ON_INIT,
  ON_EXIT,
  GET_SETTINGS,
  GET_INSTANCES,
  SET_INSTANCE,
} from '../constants/ActionTypes';

const initialState = fromJS({
    userObj: {},
    status: 0,
    settings: [],
    instances: [],
    currentInstance: {},
});

export default (state = initialState, action) => {
  let newState = state;

  switch (action.type) {
    case ON_INIT:
      newState = newState.set('userObj', _.get(action, 'payload', {}));
      newState = newState.set('status', 0);
      return newState;
    case ON_EXIT:
      newState = initialState;
      return newState;
    case GET_SETTINGS:
      newState = newState.set('settings', _.get(action, 'payload', {}));
      return newState;
    case GET_INSTANCES:
      newState = newState.set('instances', _.get(action, 'payload', {}));
      return newState;
    case SET_INSTANCE:
      newState = newState.set('currentInstance', _.get(action, 'payload', {}));
      return newState;
    default:
      return state;
  }
}
