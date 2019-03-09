import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormHelperText from '@material-ui/core/FormHelperText';
import withStyles from '@material-ui/core/styles/withStyles';
import logo from '../../assets/plexus_logo_dark.jpg';
import {
  login,
} from '../../actions/UserActions';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class SignIn extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      errorMessage: '',
      login: false,
    }
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
    this.props.actions.login({ username, password })
      .then(({status, message}) => {
        if (parseInt(status) !== 0) {
          this.setState({
            errorMessage: message,
          });
        }
        else {
          this.setState({
            login: true,
          });
        }
      });
  }

  render () {
    const { errorMessage, login } = this.state;
    const { classes } = this.props;
    if (login) {
      return <Redirect push to="/home" />;
    }

    return (
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <div style={{ padding: 20 }}>
            <img
              src={logo}
              height="50px"
              alt="plexus_logo"
            />
          </div>
          <Typography component="h1" variant="h6">
            Application Console
          </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit.bind(this)}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
                id="email"
                name="email"
                onChange={(e) => this.setUsername(e)}
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
                onChange={(e) => this.setPassword(e)}
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
          </form>
        </Paper>
      </main>
    )
  };
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      login,
    }, dispatch)
  };
}

export default withStyles(styles)(connect(null, mapDispatchToProps)(SignIn));
