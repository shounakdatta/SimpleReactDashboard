import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Redirect } from "react-router";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import PeopleIcon from "@material-ui/icons/People";
import PhonelinkSetupIcon from "@material-ui/icons/PhonelinkSetup";
import PersonIcon from "@material-ui/icons/Person";
import LanguageIcon from "@material-ui/icons/Language";
import TranslateIcon from "@material-ui/icons/Translate";
import AccountIcon from "@material-ui/icons/AccountCircle";
import AssignmentIcon from "@material-ui/icons/Assignment";
import EmailIcon from "@material-ui/icons/Email";
import logo from "../../assets/plexus_logo.png";
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
          id: "Develop",
          children: [
            { id: "Authentication", icon: <PeopleIcon />, active: true },
            { id: "Database", icon: <PersonIcon /> },
            { id: "Storage", icon: <LanguageIcon /> },
            { id: "Hosting", icon: <TranslateIcon /> },
            { id: "Functions", icon: <AccountIcon /> },
            { id: "ML Kit", icon: <AssignmentIcon /> }
          ]
        },
        {
          id: "Quality",
          children: [
            { id: "Analytics", icon: <EmailIcon /> },
            { id: "Test Lab", icon: <PhonelinkSetupIcon /> }
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
          <List component="nav" disablePadding>
            <ListItem
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
            </ListItem>
            <ListItem
              className={classNames(classes.item, classes.itemCategory)}
            >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText
                classes={{
                  primary: classes.itemPrimary
                }}
              >
                Dashboard
              </ListItemText>
            </ListItem>
            {categories.map(({ id, children }) => (
              <React.Fragment key={id}>
                <ListItem className={classes.categoryHeader}>
                  <ListItemText
                    classes={{
                      primary: classes.categoryHeaderPrimary
                    }}
                  >
                    {id}
                  </ListItemText>
                </ListItem>
                {children.map(({ id: childId, icon, active }) => (
                  <ListItem
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
                  </ListItem>
                ))}
                <Divider className={classes.divider} />
              </React.Fragment>
            ))}
          </List>
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
