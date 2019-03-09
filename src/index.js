import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/App/App'
import * as serviceWorker from './serviceWorker';
import rootReducer from './reducers/rootReducer';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import GetTheme from './theme';

const store = createStore(rootReducer, {}, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

const theme = GetTheme();

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
