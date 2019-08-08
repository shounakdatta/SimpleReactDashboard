import _ from "lodash";
import { fromJS } from "immutable";
import {
  ON_INIT,
  ON_EXIT,
  ON_VALIDATE,
  ON_CREATE_USER
} from "../constants/ActionTypes";
import { LOGGED_OUT, LOGGED_IN } from "../constants/Status";

const initialState = fromJS({
  userObj: {},
  status: LOGGED_OUT
});

export default (state = initialState, action) => {
  let newState = state;
  const { type } = action;

  if (type === ON_INIT || type === ON_VALIDATE || type === ON_CREATE_USER) {
    const {
      displayName,
      email,
      emailVerified,
      metadata,
      phoneNumber,
      photoURL,
      uid: id
    } = _.get(action, "payload", {});
    newState = newState.set("userObj", {
      displayName,
      email,
      emailVerified,
      metadata,
      phoneNumber,
      photoURL,
      uid: id
    });
    newState = newState.set("status", LOGGED_IN);
    return newState;
  } else if (type === ON_EXIT) {
    newState = initialState;
    return newState;
  } else {
    return state;
  }
};
