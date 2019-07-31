import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { PageWrapper, Snackbar } from "../../components";
import {
  getSettings,
  getInstances,
  setInstance
} from "../../actions/UserActions";
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
    const { classes } = this.props;

    return (
      <PageWrapper>
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

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        getSettings,
        getInstances,
        setInstance
      },
      dispatch
    )
  };
}

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
);
