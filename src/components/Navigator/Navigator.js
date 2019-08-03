import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Redirect } from "react-router";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import ListView from "@material-ui/core/List";
import {
  Home as HomeIcon,
  Dashboard as DashboardIcon,
  List as ListIcon,
  Input as InputIcon,
  Description as DescriptionIcon
} from "@material-ui/icons"
import ListItemView from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import * as ROUTES from "../../constants/Routes";
import { logout } from "../../actions/UserActions";
import { styles } from "./NavigatorStyles";

const LOGO_URL =
  "https://www.autojobs.com/wp-content/themes/autojobs/img/placeholders/company-logo-placeholder.png";

class Navigator extends Component {
  constructor() {
    super();

    this.state = {
      redirect: null,
      categories: [
        {
          id: "Manage",
          children: [
            { id: "Home", icon: <DashboardIcon />, active: true },
            { id: "Inventory", icon: <ListIcon /> },
          ]
        },
        {
          id: "Admin",
          children: [
            { id: "Docs", icon: <DescriptionIcon /> },
            { id: "Logout", icon: <InputIcon /> }
          ]
        }
      ]
    };
  }

  handleLogOutSubmit() {
    this.props.actions
      .logout()
      .then(() => this.setState({ redirect: "LOGIN" }));
  }

  handleRouting(route, id) {
    const { pathname } = window.location;
    if (route && ROUTES[route] && ROUTES[route] !== pathname) {
      this.setState({
        redirect: route
      });
    }
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
          <ListView component="nav" disablePadding>
            <ListItemView
              className={classNames(
                classes.firebase,
                classes.item,
                classes.itemCategory
              )}
            >
              <div style={{ width: "100%", padding: 10 }}>
                <img
                  src={LOGO_URL}
                  alt="Company Logo"
                  style={{ width: "100%" }}
                />
              </div>
            </ListItemView>
            <ListItemView
              className={classNames(classes.item, classes.itemCategory)}
            >
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText
                classes={{
                  primary: classes.itemPrimary
                }}
              >
                Dashboard
              </ListItemText>
            </ListItemView>
            {categories.map(({ id, children }) => (
              <React.Fragment key={id}>
                <ListItemView className={classes.categoryHeader}>
                  <ListItemText
                    classes={{
                      primary: classes.categoryHeaderPrimary
                    }}
                  >
                    {id}
                  </ListItemText>
                </ListItemView>
                {children.map(({ id: childId, icon, active }) => (
                  <ListItemView
                    key={childId}
                    button
                    className={active ? classes.itemActiveItem : classes.item}
                  >
                    <ListItemIcon className={classes.itemIcon}>
                      {icon}
                    </ListItemIcon>
                    <ListItemText
                      classes={{
                        primary: classes.itemPrimary
                      }}
                    >
                      {childId}
                    </ListItemText>
                  </ListItemView>
                ))}
                <Divider className={classes.divider} />
              </React.Fragment>
            ))}
          </ListView>
        </Drawer>
      </Fragment>
    );
  }
}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    userStore: state.UserStore
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        logout
      },
      dispatch
    )
  };
}

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Navigator)
);
