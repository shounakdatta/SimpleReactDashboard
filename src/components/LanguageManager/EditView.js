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

class EditView extends Component {
  constructor() {
    super();

    this.state = {
      viewName: '',
      errorMessage: '',
    }
  }

  componentDidUpdate(prevProps) {
    const { viewName } = this.props;
    if (viewName !== prevProps.viewName) {
      this.setState({ viewName: viewName ? viewName : '' });
    }
  }

  setErrorMessage(text) {
    this.setState({
      errorMessage: text
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { viewName } = this.state;
    this.props.handleSubmit(this.props.viewName, viewName)
      .then(this.handleClose.bind(this))
      .catch((err) => { this.setErrorMessage(err) });
  }

  handleClose() {
    this.setState({
      viewName: '',
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
      viewName,
      errorMessage,
    } = this.state;
    return (
      <Fragment>
        <Dialog
          open={open}
          onClose={this.handleClose.bind(this)}
          aria-labelledby="form-dialog-title"
        >
          { !!this.props.viewName &&
            <DialogTitle id="form-dialog-title">Edit View</DialogTitle>
          }
          { !this.props.viewName &&
            <DialogTitle id="form-dialog-title">Add New View</DialogTitle>
          }
          <DialogContent>
            <form
              style={{ minWidth: 400 }}
              onSubmit={this.handleSubmit.bind(this)}
            >
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="role">View Name</InputLabel>
                <Input
                  id="role"
                  name="role"
                  value={viewName}
                  onChange={(e) => this.handleChange(e, 'viewName')}
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

EditView.propTypes = {
  viewName: PropTypes.string,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default EditView;
