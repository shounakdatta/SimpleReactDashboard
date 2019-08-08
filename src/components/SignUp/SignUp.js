import React, { Component } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import {
  Avatar,
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Grid,
  Paper
} from "@material-ui/core";
import PropTypes from "prop-types";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      login: false,
      errorMessage: null
    };
  }

  setField(e, field) {
    this.setState({ [field]: e.target.value, errorMessage: null });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { firstName, lastName, email, password } = this.state;
    this.props
      .onSignUp({ displayName: `${firstName} ${lastName}`, email, password })
      .then(({ user, message }) => {
        if (user) {
          this.setState({
            login: true
          });
        } else {
          this.setState({
            errorMessage: message
          });
        }
      });
  }

  render() {
    const { classes } = this.props;
    const { errorMessage, login } = this.state;

    if (login) {
      return <Redirect push to="/home" />;
    }

    return (
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5" className={classes.headerText}>
            Sign Up
          </Typography>
          <form
            className={classes.form}
            onSubmit={this.handleSubmit.bind(this)}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="email">First Name</InputLabel>
                  <Input
                    id="fname"
                    name="fname"
                    onChange={e => this.setField(e, "firstName")}
                    autoFocus
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="email">Last Name</InputLabel>
                  <Input
                    id="lname"
                    name="lname"
                    onChange={e => this.setField(e, "lastName")}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl margin="none" required fullWidth>
                  <InputLabel htmlFor="email">Email</InputLabel>
                  <Input
                    id="email"
                    name="email"
                    onChange={e => this.setField(e, "email")}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl margin="none" required fullWidth>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input
                    name="password"
                    type="password"
                    id="password"
                    onChange={e => this.setField(e, "password")}
                  />
                  <FormHelperText error={true}>{errorMessage}</FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              SIGN UP
            </Button>
            <div className={classes.secondaryTextContainer}>
              <Typography variant="body2" className={classes.secondaryText}>
                <Link to="/login" className={classes.linkText}>
                  Already have an account? Sign in!
                </Link>
              </Typography>
            </div>
          </form>
        </Paper>
      </main>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
  onSignUp: PropTypes.func.isRequired
};

export default withStyles(styles)(SignUp);
