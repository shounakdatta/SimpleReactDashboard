import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import QueryString from "query-string";
import PropTypes from "prop-types";
import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Paper,
  Typography
} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "./style";

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    const { oobCode, continueUrl } = QueryString.parse(props.location.search);

    this.state = {
      code: oobCode,
      newPassword: null,
      continueUrl,
      successMessage: null,
      errorMessage: null
    };
  }

  setPassword(e) {
    this.setState({ newPassword: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { newPassword, code } = this.state;
    this.props.onSubmit({ newPassword, code }).then(({ success, message }) => {
      if (success) {
        this.setState({
          successMessage: message
        });
      } else {
        this.setState({
          errorMessage: message
        });
      }
    });
  }

  render() {
    const { successMessage, errorMessage } = this.state;
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <Typography variant="h5" className={classes.headerText}>
            Reset Password
          </Typography>
          {!!successMessage && (
            <Fragment>
              <div className={classes.successTextContainer}>
                <Typography variant="body2" className={classes.successText}>
                  {successMessage}
                </Typography>
              </div>
              <Link to="/login">
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  CONTINUE
                </Button>
              </Link>
            </Fragment>
          )}
          {!successMessage && (
            <form
              className={classes.form}
              onSubmit={this.handleSubmit.bind(this)}
            >
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">New Password</InputLabel>
                <Input
                  id="password"
                  name="password"
                  onChange={e => this.setPassword(e)}
                  autoFocus
                />
                <FormHelperText error={true}>{errorMessage}</FormHelperText>
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                CONFIRM
              </Button>
              <div className={classes.secondaryTextContainer}>
                <Typography variant="body2" className={classes.secondaryText}>
                  <Link to="/login" className={classes.linkText}>
                    Back to login
                  </Link>
                </Typography>
              </div>
            </form>
          )}
        </Paper>
      </main>
    );
  }
}

ResetPassword.propTypes = {
  classes: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default withStyles(styles)(ResetPassword);
