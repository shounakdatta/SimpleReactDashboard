import React from "react";
import { ResetPassword } from "../../components";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { resetPassword } from "../../actions/UserActions";

const ResetPasswordScreen = ({ actions: { resetPassword }, location }) => {
  return <ResetPassword onSubmit={resetPassword} location={location} />;
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
)(ResetPasswordScreen);
