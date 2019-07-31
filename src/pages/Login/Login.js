import React from "react";
import { Login } from "../../components";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { login } from "../../actions/UserActions";

const LoginScreen = props => {
  return <Login onLogin={props.actions.login} />;
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        login
      },
      dispatch
    )
  };
}

export default connect(
  null,
  mapDispatchToProps
)(LoginScreen);
