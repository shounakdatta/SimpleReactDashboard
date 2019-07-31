import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { PrivateRoute } from "../../components";
import * as ROUTES from "../../constants/Routes";
import "./App.css";
import {
  LoginScreen,
  HomeScreen,
  ManageRoles,
  ManageLanguages
} from "../../pages";

const App = props => {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path={ROUTES.ROOT} component={LoginScreen} />
        <Route exact path={ROUTES.LOGIN} component={LoginScreen} />
        <PrivateRoute exact path={ROUTES.HOME} component={HomeScreen} />
        <PrivateRoute
          exact
          path={ROUTES.MANAGE_ROLES}
          component={ManageRoles}
        />
        <PrivateRoute
          exact
          path={ROUTES.MANAGE_LANGUAGES}
          component={ManageLanguages}
          onChange={() => console.log("Wait")}
        />
      </Switch>
    </Router>
  );
};

function mapStateToProps(state) {
  return {
    UserStore: state.UserStore
  };
}

export default connect(mapStateToProps)(App);
