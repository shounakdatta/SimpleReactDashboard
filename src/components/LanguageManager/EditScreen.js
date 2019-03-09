import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

class EditScreen extends Component {
  constructor() {
    super();

    this.state = {
      screenName: '',
      errorMessage: '',
    }
  }

  componentDidUpdate(prevProps) {
    const { screenName } = this.props;
    if (screenName !== prevProps.screenName) {
      this.setState({ screenName: screenName ? screenName : '' });
    }
  }

  setErrorMessage(text) {
    this.setState({
      errorMessage: text
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { screenName } = this.state;
    this.props.handleSubmit(this.props.screenName, screenName)
      .then(this.handleClose.bind(this))
      .catch((err) => { this.setErrorMessage(err) });
  }

  handleClose() {
    this.setState({
      screenName: '',
      errorMessage: '',
    });
    this.props.handleClose();
  }

  handleChange(e, keyName) {
    this.setState({ [keyName]: e.target.value })
  }

  render() {
    const { open } = this.props;
    const {
      screenName,
      errorMessage,
    } = this.state;
    return (
      <Fragment>
        <Dialog
          open={open}
          onClose={this.handleClose.bind(this)}
          aria-labelledby="form-dialog-title"
        >
          { !!this.props.screenName &&
            <DialogTitle id="form-dialog-title">Edit Screen</DialogTitle>
          }
          { !this.props.screenName &&
            <DialogTitle id="form-dialog-title">Add New Screen</DialogTitle>
          }
          <DialogContent>
            <form
              style={{ minWidth: 400 }}
              onSubmit={this.handleSubmit.bind(this)}
            >
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="role">Screen Name</InputLabel>
                <Input
                  id="role"
                  name="role"
                  value={screenName}
                  onChange={(e) => this.handleChange(e, 'screenName')}
                  autoFocus
                  required
                />
                <FormHelperText error={true}>{errorMessage}</FormHelperText>
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose.bind(this)} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit.bind(this)} color="primary">
              Apply
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

EditScreen.propTypes = {
  screenName: PropTypes.string,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default EditScreen;
