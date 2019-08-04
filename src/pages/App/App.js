import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { PrivateRoute } from "../../components";
import * as ROUTES from "../../constants/Routes";
import "./App.css";
import { LoginScreen, HomeScreen } from "../../pages";
import { validateUser } from "../../actions/UserActions";
import { bindActionCreators } from "redux";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  render() {
    return (
      <Router>
        <Switch>
          <PrivateRoute exact path={ROUTES.ROOT} component={HomeScreen} />
          <Route exact path={ROUTES.LOGIN} component={LoginScreen} />
          <PrivateRoute exact path={ROUTES.HOME} component={HomeScreen} />
        </Switch>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    UserStore: state.UserStore
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        validateUser
      },
      dispatch
    )
  };
}

export default connect(mapStateToProps)(App);
