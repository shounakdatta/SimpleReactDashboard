import React, { Component } from "react";
import { Redirect } from "react-router";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import FormHelperText from "@material-ui/core/FormHelperText";
import withStyles from "@material-ui/core/styles/withStyles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import styles from "./style";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
      errorMessage: "",
      login: false
    };
  }

  setUsername(e) {
    this.setState({ username: e.target.value });
  }

  setPassword(e) {
    this.setState({ password: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;
    this.props
      .onLogin({ email: username, password })
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
    const { errorMessage, login } = this.state;
    const { classes } = this.props;
    if (login) {
      return <Redirect push to="/home" />;
    }

    return (
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h6" className={classes.headerText}>
            Sign In
          </Typography>
          <form
            className={classes.form}
            onSubmit={this.handleSubmit.bind(this)}
          >
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Username</InputLabel>
              <Input
                id="email"
                name="email"
                onChange={e => this.setUsername(e)}
                autoComplete="email"
                autoFocus
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                onChange={e => this.setPassword(e)}
                autoComplete="current-password"
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
              LOGIN
            </Button>
            <div className={classes.secondaryTextContainer}>
              <Typography variant="body2" className={classes.secondaryText}>
                <a href="/" className={classes.linkText}>
                  Forgot Username/Password
                </a>
              </Typography>
            </div>
            <div className={classes.secondaryTextContainer}>
              <Typography variant="body2" className={classes.secondaryText}>
                <a href="/" className={classes.linkText}>
                  Create New Account
                </a>
              </Typography>
            </div>
          </form>
        </Paper>
      </main>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  onLogin: PropTypes.func.isRequired
};

export default withStyles(styles)(Login);
