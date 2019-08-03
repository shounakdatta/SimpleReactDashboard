import _ from "lodash";
import { fromJS } from "immutable";
import { ON_INIT, ON_EXIT } from "../constants/ActionTypes";
import { LOGGED_OUT, LOGGED_IN } from "../constants/Status";

const initialState = fromJS({
  userObj: {},
  status: LOGGED_OUT
});

export default (state = initialState, action) => {
  let newState = state;

  switch (action.type) {
    case ON_INIT:
      const {
        displayName,
        email,
        emailVerified,
        metadata,
        phoneNumber,
        photoURL,
        uid: id
      } = _.get(action, "payload", {});
      newState = newState.set(
        "userObj",
        _.get(
          action,
          {
            displayName,
            email,
            emailVerified,
            metadata,
            phoneNumber,
            photoURL,
            id
          },
          {}
        )
      );
      newState = newState.set("status", LOGGED_IN);
      return newState;
    case ON_EXIT:
      newState = initialState;
      return newState;
    default:
      return state;
  }
};
