import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { SignUp } from "../../components";
import { create } from "../../actions/UserActions";

const SignUpScreen = ({ actions: { createUser, updateUser } }) => (
  <SignUp onSignUp={createUser} />
);

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        createUser: create
      },
      dispatch
    )
  };
}

export default connect(
  null,
  mapDispatchToProps
)(SignUpScreen);
