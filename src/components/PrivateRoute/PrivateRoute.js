import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import { LOGIN } from "../../constants/Routes";
import { LOGGED_IN } from "../../constants/Status";
import { bindActionCreators } from "redux";
import { validateUser } from "../../actions/UserActions";
import { LoadingScreen } from "../../components";

class PrivateRoute extends Component {
  state = {
    isLoggedIn: false,
    loading: true
  };

  componentDidMount() {
    const isLoggedIn = this.props.UserStore.get("status") === LOGGED_IN;
    if (isLoggedIn) this.setState({ isLoggedIn, loading: false });
    else {
      this.setState({ loading: true });
      this.props.actions
        .validateUser()
        .then(user => {
          this.setState({ isLoggedIn: true, loading: false });
        })
        .catch(error => {
          console.log(error);
          this.setState({ isLoggedIn: false, loading: false });
        });
    }
  }

  render() {
    const { component: Component, ...rest } = this.props;
    const { isLoggedIn, loading } = this.state;

    if (loading) return <LoadingScreen pageFound={true} />;
    return (
      <Route
        {...rest}
        render={routeProps =>
          isLoggedIn === true ? (
            <Component {...routeProps} />
          ) : (
            <Redirect to={{ pathname: LOGIN }} />
          )
        }
      />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivateRoute);
