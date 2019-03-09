import { combineReducers } from 'redux';
import { default as initReducer } from './InitReducer';
import { default as instanceReducer } from './InstanceReducer';

export default combineReducers({
  UserStore: initReducer,
  InstanceStore: instanceReducer,
});
