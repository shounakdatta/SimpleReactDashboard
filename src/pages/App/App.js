import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { PrivateRoute } from "../../components";
import * as ROUTES from "../../constants/Routes";
import "./App.css";
import { LoginScreen, HomeScreen } from "../../pages";

const App = props => {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path={ROUTES.ROOT} component={LoginScreen} />
        <Route exact path={ROUTES.LOGIN} component={LoginScreen} />
        <PrivateRoute exact path={ROUTES.HOME} component={HomeScreen} />
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
