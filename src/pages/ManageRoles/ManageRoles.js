import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Redirect } from 'react-router';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Tooltip from "@material-ui/core/Tooltip";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  PageWrapper,
  RoleManager,
  EditRole,
  ConfirmationModal,
  LoadingScreen,
  Snackbar
} from '../../components';
import {
  getRoles,
  deleteRole,
} from '../../actions/InstanceActions';
import { styles } from './ManageRolesStyles';

class ManageRoles extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      snackbarOpen: false,
      snackbarText: '',
      openEditRoleModal: false,
      openDeleteRoleModal: false,
      selectedRole: null,
      columns: [
        {
          colName: "Actions",
          colId: "role_id"
        },
        {
          colName: "Role",
          colId: "role_description_english"
        },
        {
          colName: "Description",
          colId: "description_en"
        },
      ],
    }
  }

  componentDidMount() {
    this.props.actions.getRoles().then(
      (response) => {
        this.setState({ loading: false })
      }
    )
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

  handleRoleCreateOpen() {
    this.setState({
      selectedRole: 0,
      openEditRoleModal: true,
    });
  }

  handleRoleEditOpen(data) {
    this.setState({
      selectedRole: data,
      openEditRoleModal: true,
    });
  }

  handleRoleEditClose() {
    this.setState({
      selectedRole: null,
      openEditRoleModal: false,
    });
  }

  handleRoleDeleteOpen(data) {
    this.setState({
      selectedRole: data,
      openDeleteRoleModal: true,
    });
  }

  handleRoleDeleteSubmit() {
    const { selectedRole } = this.state;
    this.props.actions.deleteRole(selectedRole).then(
      (response) => {
        if (parseInt(response.status) === 0) {
          this.handleSnackbarOpen("Role Deleted")
          this.setState({
            selectedRole: null,
            openDeleteRoleModal: false,
          });
        }
        else {
          this.handleSnackbarOpen(`ERROR: Delete Failed. ${response.message}`);
        }
      }
    );
  }

  handleRoleDeleteClose() {
    this.setState({
      selectedRole: null,
      openDeleteRoleModal: false,
    });
  }

  getColumns() {
    const { classes } = this.props;
    return this.state.columns.map((col, colIndex) => {
      if (col.colName === 'Actions') {
        return {
          options: {
            sort: false,
            customBodyRender: (data, tableMeta, updateValue) => {
              return (
                <div className='flex'>
                  <Tooltip title="Edit Role">
                    <div style={{ display: 'inline-block' }}>
                      <Fab
                        color="primary"
                        aria-label="editRole"
                        size="small"
                        className={classes.fab}
                        disabled={data === 4 || data === 5}
                        onClick={() => this.handleRoleEditOpen(data)}
                      >
                        <EditIcon />
                      </Fab>
                    </div>
                  </Tooltip>
                  <Tooltip title="Delete Role">
                    <div style={{ display: 'inline-block' }}>
                      <Fab
                        color="primary"
                        aria-label="deleteRole"
                        size="small"
                        className={classes.fab}
                        disabled={data === 4 || data === 5}
                        onClick={() => this.handleRoleDeleteOpen(data)}
                      >
                        <DeleteIcon />
                      </Fab>
                    </div>
                  </Tooltip>
                </div>
              );
            },
            name: 'Actions'
          }
        }
      }
      else {
        return col.colName;
      }
    });
  }

  getData() {
    const { instanceStore } = this.props;
    const { columns } = this.state;
    const roles = instanceStore.get('roles');
    return roles.map((role) => {
      return columns.map((column) => {
        return role[column.colId];
      })
    });
  }

  getOptions() {
    const { classes } = this.props;
    return {
      filterType: 'dropdown',
      download: false,
      print: false,
      viewColumns: false,
      filter: false,
      selectableRows: false,
      customToolbar: () => {
        return (
          <div style={{ display: 'inline-block', margin: '10px 0px' }}>
            <Tooltip title="Add New Role">
              <Fab
                color="primary"
                aria-label="addRole"
                size="small"
                className={classes.fab}
                style={{backgroundColor: '#757575', textDecoration: 'none'}}
                onClick={() => this.handleRoleCreateOpen()}
              >
                <AddIcon />
              </Fab>
            </Tooltip>
          </div>
        );
      }
    }
  }

  render() {
    const {
      loading,
      snackbarOpen,
      snackbarText,
      selectedRole,
      openEditRoleModal,
      openDeleteRoleModal,
    } = this.state;
    const { classes, userStore } = this.props;

    if (loading) {
      return <LoadingScreen pageFound={true} />;
    }

    if (!userStore.get('currentInstance').company) {
      return <Redirect push to='/home' />;
    }

    const columns = this.getColumns();
    const data = this.getData();
    const options = this.getOptions();

    return (
      <PageWrapper>
        <div className={classes.pageHeaderContainer}>
          <Typography
            classes={{ root: classes.pageHeader }}
            component="h5"
            variant="h5"
          >
            Role Manager
          </Typography>
        </div>
        <RoleManager data={data} columns={columns} options={options}/>
        <EditRole
          open={openEditRoleModal}
          roleId={selectedRole}
          handleClose={this.handleRoleEditClose.bind(this)}
        />
        <ConfirmationModal
          open={openDeleteRoleModal}
          title="Delete Role"
          message="Are you sure you want to delete the selected role?"
          handleSubmit={this.handleRoleDeleteSubmit.bind(this)}
          handleClose={this.handleRoleDeleteClose.bind(this)}
        />
        <Snackbar
          snackbarOpen={snackbarOpen}
          message={snackbarText}
          handleSnackbarClose={() => this.handleSnackbarClose()}
        />
      </PageWrapper>
    );
  }
}

function mapStateToProps(state) {
  return {
    instanceStore: state.InstanceStore,
    userStore: state.UserStore
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getRoles,
      deleteRole,
    }, dispatch)
  };
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ManageRoles));
