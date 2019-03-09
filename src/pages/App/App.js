import React from "react";
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { PrivateRoute } from '../../components';
import * as ROUTES from "../../constants/Routes";
import "./App.css";
import {
  Login,
  Home,
  ManageRoles,
  ManageLanguages,
} from '../../pages'

const App = (props) => {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path={ROUTES.ROOT} component={Login} />
        <Route exact path={ROUTES.LOGIN} component={Login} />
        <PrivateRoute exact path={ROUTES.HOME} component={Home} />
        <PrivateRoute exact path={ROUTES.MANAGE_ROLES} component={ManageRoles} />
        <PrivateRoute
          exact
          path={ROUTES.MANAGE_LANGUAGES}
          component={ManageLanguages}
          onChange={() => console.log('Wait')}
        />
      </Switch>
    </Router>
  );
}

function mapStateToProps(state) {
  return {
    UserStore: state.UserStore
  };
}

export default connect(mapStateToProps)(App);
