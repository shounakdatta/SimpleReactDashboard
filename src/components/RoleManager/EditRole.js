import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
import {
  Snackbar
} from '../../components';
import {
  saveRole,
} from '../../actions/InstanceActions';

class EditRole extends Component {
  constructor() {
    super();

    this.state = {
      roleName: '',
      roleDescription: '',
      errorMessage: '',
      snackbarOpen: false,
      snackbarText: '',
    }
  }

  componentDidUpdate(prevProps) {
    const { instanceStore, roleId } = this.props;
    if (prevProps.roleId !== roleId && roleId) {
      const currentRole = instanceStore.get('roles')
        .find(role => {
          return role.role_id === roleId
        });
      const roleName = currentRole.role_description_english;
      const roleDescription = currentRole.description_en;
      this.setState({ roleName, roleDescription });
    }
  }

  handleSnackbarOpen = (text) => {
    this.setState({
      snackbarText: text,
      snackbarOpen: true,
    });
  }

  handleSnackbarClose() {
    this.setState({
      snackbarText: '',
      snackbarOpen: false,
    });
  }

  setErrorMessage(text) {
    this.setState({
      errorMessage: text
    });
  }

  handleSubmit() {
    const { instanceStore, roleId } = this.props;
    const { roleName, roleDescription } = this.state;
    let newRole = instanceStore.get('roles')
      .find(role => {
        return role.role_id === roleId
      });
    newRole = !newRole ? { role_id: roleId } : newRole;
    newRole.role_description_english = roleName;
    newRole.description_en = roleDescription;
    this.props.actions.saveRole(newRole)
      .then((response) => {
        if (parseInt(response.status, 10) === 0) {
          this.handleClose();
          this.handleSnackbarOpen("Role Saved");
        }
        else {
          this.setErrorMessage(response.message);
        }
      });
  }

  handleClose() {
    this.setState({
      roleName: '',
      roleDescription: '',
      errorMessage: '',
    });
    this.props.handleClose();
  }

  handleChange(e, keyName) {
    this.setState({ [keyName]: e.target.value })
  }

  render() {
    const { open, roleId } = this.props;
    const {
      roleName,
      roleDescription,
      errorMessage,
      snackbarOpen,
      snackbarText
    } = this.state;
    return (
      <Fragment>
        <Dialog
          open={open}
          onClose={this.handleClose.bind(this)}
          aria-labelledby="form-dialog-title"
        >
          { !!roleId &&
            <DialogTitle id="form-dialog-title">Edit Role</DialogTitle>
          }
          { !roleId &&
            <DialogTitle id="form-dialog-title">Add New Role</DialogTitle>
          }
          <DialogContent>
            <form>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="role">Role</InputLabel>
                <Input
                  id="role"
                  name="role"
                  value={roleName}
                  onChange={(e) => this.handleChange(e, 'roleName')}
                  autoFocus
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="description">Description</InputLabel>
                <Input
                  name="description"
                  type="description"
                  id="description"
                  value={roleDescription}
                  onChange={(e) => this.handleChange(e, 'roleDescription')}
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
        <Snackbar
          snackbarOpen={snackbarOpen}
          message={snackbarText}
          handleSnackbarClose={() => this.handleSnackbarClose()}
        />
      </Fragment>
    );
  }
}

EditRole.propTypes = {
  roleId: PropTypes.number,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    instanceStore: state.InstanceStore
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      saveRole,
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditRole);
