import React, { Component } from "react";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import { PageWrapper, Snackbar } from "../../components";
import { styles } from "./HomeStyles";

class Home extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      snackbarOpen: false,
      snackbarText: ""
    };
  }

  handleSnackbarOpen = text => {
    this.setState({
      snackbarText: text,
      snackbarOpen: true
    });
  };

  handleSnackbarClose() {
    this.setState({
      snackbarText: "",
      snackbarOpen: false
    });
  }

  render() {
    const { snackbarOpen, snackbarText } = this.state;

    return (
      <PageWrapper pageHeader="Home">
        <Snackbar
          snackbarOpen={snackbarOpen}
          message={snackbarText}
          handleSnackbarClose={() => this.handleSnackbarClose()}
        />
      </PageWrapper>
    );
  }
}

function mapStateToProps(state) {
  return {
    userStore: state.UserStore
  };
}

export default withStyles(styles)(connect(mapStateToProps)(Home));
