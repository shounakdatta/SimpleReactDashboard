import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router';
import _ from 'lodash';
import { fromJS } from 'immutable';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import PhonelinkSetupIcon from '@material-ui/icons/PhonelinkSetup';
import LockIcon from '@material-ui/icons/Lock';
import PersonIcon from '@material-ui/icons/Person';
import LanguageIcon from '@material-ui/icons/Language';
import TranslateIcon from '@material-ui/icons/Translate';
import AccountIcon from '@material-ui/icons/AccountCircle';
import AssignmentIcon from '@material-ui/icons/Assignment';
import EmailIcon from '@material-ui/icons/Email';
import logo from '../../assets/plexus_logo.png';
import * as ROUTES from '../../constants/Routes';
import {
  logout,
} from '../../actions/UserActions';
import { styles } from './NavigatorStyles'

class Navigator extends Component {
  constructor() {
    super();

    this.state = {
      redirect: null,
      categories: fromJS([
        {
          id: 'Master',
          defaultDisabled: false,
          children: [
            {
              id: 'Select Instance',
              icon: <LanguageIcon/>,
              active: false,
              route: 'HOME'
            }, {
              id: 'Create New Instance',
              icon: <PersonIcon/>
            }
          ]
        }, {
          id: 'Instance',
          defaultDisabled: true,
          children: [
            {
              id: 'Role Manager',
              icon: <PeopleIcon/>,
              childDefaultDisabled: 'inherit',
              disableControlKey: 'currentInstance',
              controlKeyPath: ['company'],
              route: 'MANAGE_ROLES'
            }, {
              id: 'Manage Language Files',
              icon: <TranslateIcon/>,
              childDefaultDisabled: 'inherit',
              disableControlKey: 'currentInstance',
              controlKeyPath: ['company'],
              route: 'MANAGE_LANGUAGES'
            }, {
              id: 'Role Profile Manager',
              icon: <AccountIcon/>,
              childDefaultDisabled: 'inherit',
              disableControlKey: 'currentInstance',
              controlKeyPath: ['company'],
            }, {
              id: 'Policy Manager',
              icon: <AssignmentIcon/>,
              childDefaultDisabled: 'inherit',
              disableControlKey: 'currentInstance',
              controlKeyPath: ['company'],
            }, {
              id: 'Email Manager',
              icon: <EmailIcon/>,
              childDefaultDisabled: 'inherit',
              disableControlKey: 'currentInstance',
              controlKeyPath: ['company'],
            }, {
              id: 'Patch Manager',
              icon: <PhonelinkSetupIcon/>,
              childDefaultDisabled: 'inherit',
              disableControlKey: 'currentInstance',
              controlKeyPath: ['company'],
            }
          ]
        }
      ]),
    }
  }

  handleLogOutSubmit() {
    this.props.actions.logout().then(
      () => this.setState({ redirect: 'LOGIN' })
    );
  }

  handleRouting(route, id) {
    const { pathname } = window.location;
    if (route && ROUTES[route] && ROUTES[route] !== pathname) {
      this.setState({
        redirect: route,
      })
    }
  }

  isActiveLink(route) {
    const { pathname } = window.location;
    if (route && ROUTES[route] && ROUTES[route] === pathname) {
      return true;
    }
    return false;
  }

  isDisabledLink(defaultDisabled, child) {
    const { userStore } = this.props;
    const childDefaultDisabled = child.get('childDefaultDisabled');
    const disableControlKey = child.get('disableControlKey');
    const controlKeyPath = child.get('controlKeyPath');
    const allowDisable = childDefaultDisabled === 'inherit' ?
      defaultDisabled : (
        childDefaultDisabled !== undefined ?
        childDefaultDisabled : false
      );
    let disabled = false;
    if (controlKeyPath) {
      const controlKeyValue = _.get(
        userStore.get(disableControlKey),
        controlKeyPath.toJS()
      );
      disabled = allowDisable ?
        (controlKeyValue ? !controlKeyValue : true) : false;
    }
    return disabled;
  }

  render() {
    const { classes, userStore, ...other } = this.props;
    const { redirect, categories } = this.state;

    if (redirect) {
      return <Redirect push to={ROUTES[redirect]} />;
    }

    return (
      <Fragment>
        <Drawer variant="permanent" {...other}>
          <List component="nav" disablePadding>
            <ListItem className={classNames(classes.firebase, classes.item, classes.itemCategory)}>
              <div style={{ width: '100%', padding: 10 }}>
                <img src={logo} alt='Plexus Logo' style={{ width: '100%' }}/>
              </div>
            </ListItem>
            <ListItem className={classNames(classes.item, classes.itemCategory)}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText
                classes={{
                  primary: classes.itemPrimary,
                }}
              >
                PPG Console
              </ListItemText>
            </ListItem>
            {categories.map((category) => {
              const id = category.get('id');
              const children = category.get('children');
              const defaultDisabled = category.get('defaultDisabled');
              return (
                <React.Fragment key={id}>
                  <ListItem
                    className={classes.categoryHeader}
                  >
                    <ListItemText
                      classes={{
                        primary: classes.categoryHeaderPrimary,
                      }}
                    >
                      {id}
                    </ListItemText>
                  </ListItem>
                  {children.map((child) => {
                    const childId = child.get('id');
                    const icon = child.get('icon').toJS();
                    const route = child.get('route');
                    const active = this.isActiveLink(route);
                    const disabled = this.isDisabledLink(defaultDisabled, child);

                    return (
                      <ListItem
                        button
                        dense
                        key={childId}
                        disabled={disabled}
                        onClick={() => this.handleRouting(route, childId)}
                        className={classNames(
                          classes.item,
                          classes.itemActionable,
                          active && classes.itemActiveItem,
                        )}
                      >
                        <ListItemIcon>{icon}</ListItemIcon>
                        <ListItemText
                          classes={{
                            primary: classes.itemPrimary,
                            textDense: classes.textDense,
                          }}
                        >
                          {childId}
                        </ListItemText>
                      </ListItem>
                    )
                  })}
                  <Divider className={classes.divider} />
                </React.Fragment>
              )
            })}
            <ListItem className={classes.categoryHeader}>
              <ListItemText
                classes={{
                  primary: classes.categoryHeaderPrimary,
                }}
              >
                Application
              </ListItemText>
            </ListItem>
            <ListItem
              button
              dense
              key={-1}
              className={classNames(
                classes.item,
                classes.itemActionable,
              )}
              onClick={this.handleLogOutSubmit.bind(this)}
            >
              <ListItemIcon><LockIcon/></ListItemIcon>
              <ListItemText
                classes={{
                  primary: classes.itemPrimary,
                  textDense: classes.textDense,
                }}
              >
                Logout
              </ListItemText>
            </ListItem>
          </List>
        </Drawer>
      </Fragment>
    );
  }
}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    userStore: state.UserStore
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      logout,
    }, dispatch)
  };
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Navigator));
