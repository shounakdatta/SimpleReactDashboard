import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Redirect } from 'react-router';
import { Prompt } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Tooltip from "@material-ui/core/Tooltip";
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import PageviewIcon from '@material-ui/icons/Pageview';
import SubjectIcon from '@material-ui/icons/Subject';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  PageWrapper,
  LanguageManager,
  EditScreen,
  EditView,
  EditContent,
  ConfirmationModal,
  LoadingScreen,
  Snackbar
} from '../../components';
import {
  getLangObj,
  editScreen,
  deleteScreen,
  editView,
  deleteView,
  editContent,
  saveLang,
} from '../../actions/InstanceActions';
import { styles } from './ManageLanguagesStyles';

class ManageLanguages extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      snackbarOpen: false,
      snackbarText: '',
      selectedScreen: '',
      selectedView: '',
      viewContent: [],
      openConfirmationModal: false,
      confirmationModalTitle: '',
      confirmationModalText: '',
      openEditScreen: false,
      openEditView: false,
      openEditContent: false,
      screenColumns: [
        {
          colName: "Actions",
          colId: "NAME"
        },
        {
          colName: "Screen",
          colId: "NAME"
        },
      ],
      viewColumns: [
        {
          colName: "Actions",
          colId: "LABEL"
        },
        {
          colName: "View",
          colId: "LABEL"
        },
      ],
    }
  }

  componentDidMount() {
    this.props.actions.getLangObj().then(
      (response) => {
        this.setState({ loading: false })
      }
    )
  }

  handleSnackbarOpen(text) {
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

  handleConfirmationModalOpen(title, text, selectedScreen, selectedView) {
    selectedScreen = selectedScreen === null ?
      this.state.selectedScreen : selectedScreen;
    this.setState({
      selectedScreen,
      selectedView,
      confirmationModalTitle: title,
      confirmationModalText: text,
      openConfirmationModal: true,
    });
  }

  handleConfirmationModalClose(screenDeleted) {
    this.setState({
      selectedScreen: screenDeleted ? '' : this.state.selectedScreen,
      selectedView: '',
      confirmationModalTitle: '',
      confirmationModalText: '',
      openConfirmationModal: false,
    });
  }

  handleConfirmationModalSubmit() {
    const { selectedScreen, selectedView } = this.state;

    if (selectedView) {
      this.props.actions.deleteView(selectedScreen, selectedView)
        .then(() => {
          this.handleConfirmationModalClose(false);
          this.handleSnackbarOpen('View Deleted');
        });
    }
    else {
      this.props.actions.deleteScreen(selectedScreen)
        .then(() => {
          this.handleConfirmationModalClose(true);
          this.handleSnackbarOpen('Screen Deleted');
        });
    }
  }

  handleEditScreenOpen(selectedScreen) {
    this.setState({
      selectedScreen,
      openEditScreen: true,
    });
  }

  handleEditScreenSubmit(oldScreenName, newScreenName) {
    const { instanceStore } = this.props;
    const screenNameExists = instanceStore.get('langViews')
      .find((screen) => screen.NAME === newScreenName);

    return new Promise((resolve, reject) => {
      if (screenNameExists) {
        reject(`This screen name already exists,
          and duplicates are not allowed`);
      }
      else {
        this.props.actions
          .editScreen(oldScreenName, newScreenName)
          .then(
            () => {
              this.handleSnackbarOpen("Screen Saved");
              resolve();
            }
          );
      }
    });
  }

  handleEditScreenClose() {
    this.setState({
      selectedScreen: '',
      openEditScreen: false,
    });
  }

  handleSeeViews(selectedScreen) {
    this.setState({
      selectedScreen,
    });
  }

  handleEditViewOpen(selectedView) {
    this.setState({
      selectedView,
      openEditView: true,
    });
  }

  handleEditViewSubmit(oldViewName, newViewName) {
    const { selectedScreen } = this.state;
    const { instanceStore } = this.props;
    const viewNameExists = instanceStore.get('langViews')
      .find((screen) => screen.NAME === selectedScreen)
      .CONTENT
      .find((view) => view.LABEL === newViewName);

    return new Promise((resolve, reject) => {
      if (viewNameExists) {
        reject(`This element name already exists,\
          and duplicates are not allowed`);
      }
      else {
        this.props.actions
          .editView(selectedScreen, oldViewName, newViewName)
          .then(
            () => {
              this.handleSnackbarOpen("View Saved");
              resolve();
            }
          );
      }
    });
  }

  handleEditViewClose() {
    this.setState({
      selectedView: '',
      openEditView: false,
    });
  }

  handleEditContentOpen(selectedView) {
    const { selectedScreen } = this.state;
    const { instanceStore } = this.props;
    let viewContent = instanceStore.get('langViews')
      .find((screen) => screen.NAME === selectedScreen)
      .CONTENT
      .find((view) => view.LABEL === selectedView)
      .CONTENT;
    viewContent = viewContent ? viewContent : [];
    this.setState({
      selectedView,
      viewContent,
      openEditContent: true,
    });
  }

  handleEditContentSubmit(viewContent) {
    const { selectedScreen, selectedView } = this.state;
    return new Promise((resolve) => {
      this.props.actions
        .editContent(selectedScreen, selectedView, viewContent)
        .then(
          () => {
            this.handleSnackbarOpen("Content Saved");
            resolve();
          }
        );
    });
  }

  handleEditContentClose() {
    this.setState({
      selectedView: '',
      viewContent: [],
      openEditContent: false,
    });
  }

  handleApplyChanges() {
    const { instanceStore } = this.props;
    const file_content = instanceStore.get('langViews');
    const version = instanceStore.get('version');
    this.props.actions
      .saveLang({ file_content, version })
      .then(
        (response) => {
          if (parseInt(response.status) === 0) {
            this.handleSnackbarOpen("Changes Saved");
          }
          else {
            this.handleSnackbarOpen(`${response.message}`);
          }
        }
      )
      .catch(
        (err) => {
          this.handleSnackbarOpen(`${err}`);
        }
      );
  }

  getScreenColumns() {
    const { classes } = this.props;
    return this.state.screenColumns.map((col, colIndex) => {
      if (col.colName === 'Actions') {
        return {
          options: {
            sort: false,
            customBodyRender: (data, tableMeta, updateValue) => {
              return (
                <div className='flex'>
                  <Tooltip title="Edit Screen">
                    <div style={{ display: 'inline-block' }}>
                      <Fab
                        color="primary"
                        aria-label="editScreen"
                        size="small"
                        className={classes.fab}
                        onClick={() => this.handleEditScreenOpen(data)}
                      >
                        <EditIcon />
                      </Fab>
                    </div>
                  </Tooltip>
                  <Tooltip title="See Views">
                    <div style={{ display: 'inline-block' }}>
                      <Fab
                        color="primary"
                        aria-label="seeViews"
                        size="small"
                        className={classes.fab}
                        onClick={() => this.handleSeeViews(data)}
                      >
                        <PageviewIcon />
                      </Fab>
                    </div>
                  </Tooltip>
                  <Tooltip title="Delete Screen">
                    <div style={{ display: 'inline-block' }}>
                      <Fab
                        color="primary"
                        aria-label="deleteScreen"
                        size="small"
                        className={classes.fab}
                        onClick={
                          () => this.handleConfirmationModalOpen(
                            'Delete Screen',
                            `If you delete this screen, all of the elements
                             and all of the content defined in this screen
                             will be deleted as well. This operation cannot
                             be undone. Click Continue to delete, or click
                             Cancel.`,
                             data,
                             this.state.selectedView
                          )
                        }
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

  getViewColumns() {
    const { classes } = this.props;
    const data = this.getViewData();

    if (data.length === 1 && data[0].length === 1) {
      return [
        {
          options: {
            sort: false,
            customBodyRender: (data, tableMeta, updateValue) => {
              return (
                <div style={{ display: 'flex', justifyContent: 'center'}}>
                  <Typography
                    variant="subtitle1"
                  >
                    {data}
                  </Typography>
                </div>
              );
            },
            name: ''
          }
        }
      ];
    }

    return this.state.viewColumns.map((col, colIndex) => {
      if (col.colName === 'Actions') {
        return {
          options: {
            sort: false,
            customBodyRender: (data, tableMeta, updateValue) => {
              return (
                <div className='flex'>
                  <Tooltip title="Edit View">
                    <div style={{ display: 'inline-block' }}>
                      <Fab
                        color="primary"
                        aria-label="editView"
                        size="small"
                        className={classes.fab}
                        onClick={() => this.handleEditViewOpen(data)}
                      >
                        <EditIcon />
                      </Fab>
                    </div>
                  </Tooltip>
                  <Tooltip title="See Content">
                    <div style={{ display: 'inline-block' }}>
                      <Fab
                        color="primary"
                        aria-label="seeContent"
                        size="small"
                        className={classes.fab}
                        onClick={() => this.handleEditContentOpen(data)}
                      >
                        <SubjectIcon />
                      </Fab>
                    </div>
                  </Tooltip>
                  <Tooltip title="Delete View">
                    <div style={{ display: 'inline-block' }}>
                      <Fab
                        color="primary"
                        aria-label="deleteView"
                        size="small"
                        className={classes.fab}
                        onClick={
                          () => this.handleConfirmationModalOpen(
                            'Delete View',
                            `If you delete this element, all of the content
                             defined in this screen will be deleted as well.
                             This operation cannot be undone. Click Continue
                             to delete, or click Cancel.`,
                             null,
                             data
                          )
                        }
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

  getScreenData() {
    const { instanceStore } = this.props;
    const { screenColumns } = this.state;
    const langViews = instanceStore.get('langViews');
    return langViews.map((view) => {
      return screenColumns.map((column) => {
        return view[column.colId];
      })
    });
  }

  getViewData() {
    const { instanceStore } = this.props;
    const {
      viewColumns,
      selectedScreen,
      selectedView,
      openEditScreen,
      openConfirmationModal,
    } = this.state;
    const enableViewData = selectedScreen
      && !openEditScreen
      && (!openConfirmationModal || selectedView);

    if (enableViewData) {
      const langViews = instanceStore.get('langViews');
      const screenObj = langViews
        .find((screen) => screen.NAME === selectedScreen);
      const screenViews = screenObj.CONTENT;
      return screenViews.map((view) => {
        return viewColumns.map((column) => {
          return view[column.colId];
        });
      });
    }
    return [["No screen selected. Click See Views to Manage Views."]];
  }

  getScreenOptions() {
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
            <Tooltip title="Add New Screen">
              <Fab
                color="primary"
                aria-label="addScreen"
                size="small"
                className={classes.fab}
                style={{backgroundColor: '#757575', textDecoration: 'none'}}
                onClick={() => this.handleEditScreenOpen('')}
              >
                <AddIcon />
              </Fab>
            </Tooltip>
          </div>
        );
      }
    }
  }

  getViewOptions() {
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
            <Tooltip title="Add New View">
              <Fab
                color="primary"
                aria-label="addView"
                size="small"
                className={classes.fab}
                style={{backgroundColor: '#757575', textDecoration: 'none'}}
                onClick={() => this.handleEditViewOpen('')}
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
      selectedScreen,
      selectedView,
      viewContent,
      openEditScreen,
      openEditView,
      openEditContent,
      openConfirmationModal,
      confirmationModalTitle,
      confirmationModalText,
    } = this.state;
    const { classes, userStore } = this.props;

    if (loading) {
      return <LoadingScreen pageFound={true} />;
    }

    if (!userStore.get('currentInstance').company) {
      return <Redirect push to='/home' />;
    }

    const screenColumns = this.getScreenColumns();
    const screenData = this.getScreenData();
    const screenOptions = this.getScreenOptions();

    const viewColumns = this.getViewColumns();
    const viewData = this.getViewData();
    const viewOptions = this.getViewOptions();

    return (
      <PageWrapper>
        <Prompt
          when={true}
          message={location => `Are you sure you want to go to ${location.pathname}`}
        />
        <div className={classes.pageHeaderContainer}>
          <Typography
            classes={{ root: classes.pageHeader }}
            component="h5"
            variant="h5"
          >
            Language Manager
          </Typography>
        </div>
        <div className="row" style={{ justifyContent: 'flex-end', margin: '0px auto 20px' }}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={this.handleApplyChanges.bind(this)}
          >
            APPLY CHANGES
          </Button>
        </div>
        <div className="row">
          <div className="col-md-6">
            <LanguageManager
              title="Manage Screens"
              data={screenData}
              columns={screenColumns}
              options={screenOptions}
            />
          </div>
          <div className="col-md-6">
            <LanguageManager
              title="Manage Views"
              data={viewData}
              columns={viewColumns}
              options={viewOptions}
            />
          </div>
        </div>
        <EditScreen
          screenName={selectedScreen}
          open={openEditScreen}
          handleClose={this.handleEditScreenClose.bind(this)}
          handleSubmit={this.handleEditScreenSubmit.bind(this)}
        />
        <EditView
          viewName={selectedView}
          open={openEditView}
          handleClose={this.handleEditViewClose.bind(this)}
          handleSubmit={this.handleEditViewSubmit.bind(this)}
        />
        <EditContent
          viewContent={viewContent}
          open={openEditContent}
          handleClose={this.handleEditContentClose.bind(this)}
          handleSubmit={this.handleEditContentSubmit.bind(this)}
        />
        <ConfirmationModal
          open={openConfirmationModal}
          title={confirmationModalTitle}
          message={confirmationModalText}
          handleClose={this.handleConfirmationModalClose.bind(this)}
          handleSubmit={this.handleConfirmationModalSubmit.bind(this)}
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
      getLangObj,
      editScreen,
      deleteScreen,
      editView,
      deleteView,
      editContent,
      saveLang,
    }, dispatch)
  };
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ManageLanguages));
