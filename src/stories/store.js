import React from "react";
import { Provider } from "react-redux";
import { MuiThemeProvider } from "@material-ui/core/styles";
import GetTheme from "../theme";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers/rootReducer";

const store = createStore(
  rootReducer,
  {},
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

export default storyFn => (
  <Provider store={store}>
    <MuiThemeProvider theme={GetTheme()}>{storyFn()}</MuiThemeProvider>
  </Provider>
);
