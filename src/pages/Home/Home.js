import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { List } from "immutable";
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Tooltip from "@material-ui/core/Tooltip";
import Fab from '@material-ui/core/Fab';
import LanguageIcon from '@material-ui/icons/Language';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import {
  PageWrapper,
  SelectInstance,
  LoadingScreen,
  Snackbar
} from '../../components';
import {
  getSettings,
  getInstances,
  setInstance,
} from '../../actions/UserActions';
import { styles } from './HomeStyles'

class Home extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      snackbarOpen: false,
      snackbarText: '',
      columns: [
        {
          colName: "Actions",
          colId: "data"
        },
        {
          colName: "Company Name",
          colId: "company"
        },
        {
          colName: "Company ID",
          colId: "company_id"
        },
        {
          colName: "Password",
          colId: "password"
        },
        {
          colName: "DSN",
          colId: "dsn"
        },
        {
          colName: "Active",
          colId: "isactive"
        }
      ],
    }
  }

  componentDidMount() {
    this.props.actions.getSettings();
    this.props.actions.getInstances().then(
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

  setInstance(data) {
    const instances = this.props.userStore.get('instances');
    const selectedInstance = instances.find(
      (instance) => {
        return instance.data === data;
      }
    );
    this.props.actions.setInstance(selectedInstance).then(
      (response) => {
        if (parseInt(response.status) === 0) {
          this.handleSnackbarOpen('New Instance Selected');
        }
        else {
          this.handleSnackbarOpen(`Error: ${response.message}`);
        }
      }
    );
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
                  <Tooltip title="Set Instance">
                    <Fab
                      color="primary"
                      aria-label="setInstance"
                      size="small"
                      className={classes.fab}
                      onClick={() => this.setInstance(data)}
                    >
                      <LanguageIcon />
                    </Fab>
                  </Tooltip>
                  <Tooltip title="Edit Instance">
                    <Fab
                      color="primary"
                      aria-label="editInstance"
                      size="small"
                      className={classes.fab}
                    >
                      <EditIcon />
                    </Fab>
                  </Tooltip>
                </div>
              );
            },
            name: 'Actions'
          }
        }
      }
      else if (col.colName === "Active") {
        return {
          options: {
            sort: false,
            customBodyRender: (value, tableMeta, updateValue) => {
              if (parseInt(value, 10)) {
                return <CheckIcon color="primary" />
              }
              return <CloseIcon color="error"/>
            },
            name: 'Active'
          }
        }
      }
      else {
        return col.colName;
      }
    });
  }

  getData() {
    const { userStore } = this.props;
    const { columns } = this.state;
    const instances = userStore.get('instances');
    return instances.map((instance) => {
      return columns.map((column) => {
        return instance[column.colId];
      })
    });
  }

  render() {
    const { loading, snackbarOpen, snackbarText } = this.state;
    const { classes } = this.props;

    if (loading) {
      return <LoadingScreen pageFound={true} />;
    }

    const columns = this.getColumns();
    const data = List.isList(this.getData()) ? [] : this.getData();

    return (
      <PageWrapper>
        <div className={classes.pageHeaderContainer}>
          <Typography
            classes={{ root: classes.pageHeader }}
            component="h5"
            variant="h5"
          >
            Select Instance
          </Typography>
        </div>
        <SelectInstance data={data} columns={columns}/>
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
    userStore: state.UserStore
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getSettings,
      getInstances,
      setInstance,
    }, dispatch)
  };
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Home));
