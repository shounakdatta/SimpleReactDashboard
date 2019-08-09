import React from "react";
import { ForgotPassword } from "../../components";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { resetPassword } from "../../actions/UserActions";

const ForgotPasswordScreen = ({ actions: { resetPassword } }) => {
  return <ForgotPassword onSubmit={resetPassword} />;
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        resetPassword
      },
      dispatch
    )
  };
}

export default connect(
  null,
  mapDispatchToProps
)(ForgotPasswordScreen);
