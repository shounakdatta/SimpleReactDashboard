import React from "react";
import { ForgotPassword } from "../../components";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { forgotPassword } from "../../actions/UserActions";

const ForgotPasswordScreen = ({ actions: { forgotPassword } }) => {
  return <ForgotPassword onSubmit={forgotPassword} />;
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        forgotPassword
      },
      dispatch
    )
  };
}

export default connect(
  null,
  mapDispatchToProps
)(ForgotPasswordScreen);
