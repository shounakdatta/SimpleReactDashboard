import React, { Component } from "react";
import { Link } from "react-router-dom";
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

class ForgotPassword extends Component {
  constructor() {
    super();

    this.state = {
      email: null,
      successMessage: null,
      errorMessage: null
    };
  }

  setEmail(e) {
    this.setState({ email: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email } = this.state;
    this.props.onSubmit(email).then(({ success, message }) => {
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
            <div className={classes.successTextContainer}>
              <Typography variant="body2" className={classes.successText}>
                {successMessage}
              </Typography>
            </div>
          )}
          {!successMessage && (
            <form
              className={classes.form}
              onSubmit={this.handleSubmit.bind(this)}
            >
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input
                  id="email"
                  name="email"
                  onChange={e => this.setEmail(e)}
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

ForgotPassword.propTypes = {
  classes: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default withStyles(styles)(ForgotPassword);
