import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  Button,
  FormControl,
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
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    };
  }

  setField(e, field) {
    this.setState({ [field]: e.target.value });
  }

  handleSubmit(e) {
    const { firstName, lastName, email, password } = this.state;
    e.preventDefault();
    const user = {
      displayName: `${firstName} ${lastName}`,
      email,
      password
    };
    console.log(user);
  }

  render() {
    const { classes } = this.props;
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
                  {/* <FormHelperText error={true}>{errorMessage}</FormHelperText> */}
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
              Sign Up
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
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignUp);
