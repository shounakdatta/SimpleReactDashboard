import { combineReducers } from "redux";
import { default as initReducer } from "./InitReducer";

export default combineReducers({
  UserStore: initReducer
});
