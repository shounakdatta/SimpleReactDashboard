import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class ConfirmationModal extends Component {
  handleChange(e, keyName) {
    this.setState({ [keyName]: e.target.value });
  }

  render() {
    const { open, title, message, submitText } = this.props;
    return (
      <Dialog
        open={open}
        onClose={this.props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {!title ? "Confirm" : title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {!message ? "Are you sure you want to proceed?" : message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.props.handleSubmit} color="primary">
            {!submitText ? "Continue" : submitText}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

ConfirmationModal.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
  submitText: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default ConfirmationModal;
