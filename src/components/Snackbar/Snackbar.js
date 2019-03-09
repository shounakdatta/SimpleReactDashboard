import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';

const PreBuiltSnackbar = (props) => {
  const {
    message,
    duration,
    snackbarOpen,
    handleSnackbarClose
  } = props;
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      open={ snackbarOpen }
      autoHideDuration={ duration || 3000 }
      onClose={() => handleSnackbarClose()}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={<span id="message-id">{ message || "" }</span>}
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={() => handleSnackbarClose()}
        >
          <CloseIcon />
        </IconButton>,
      ]}
    />
  );
}

PreBuiltSnackbar.propTypes = {
  snackbarOpen: PropTypes.bool.isRequired,
  handleSnackbarClose: PropTypes.func.isRequired,
  message: PropTypes.string,
};

export default PreBuiltSnackbar;
