import React from "react";
import PropTypes from "prop-types";
import {
  Typography,
  AppBar,
  Grid,
  Hidden,
  IconButton,
  Toolbar,
  Tooltip
} from "@material-ui/core";
import { Help as HelpIcon, Menu as MenuIcon } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";

const lightColor = "rgba(255, 255, 255, 0.7)";

const styles = theme => ({
  root: {
    padding: 10
  },
  secondaryBar: {
    zIndex: 0
  },
  menuButton: {
    marginLeft: -theme.spacing.unit
  },
  iconButtonAvatar: {
    padding: 4
  },
  link: {
    textDecoration: "none",
    color: lightColor,
    "&:hover": {
      color: theme.palette.common.white
    }
  },
  button: {
    borderColor: lightColor
  }
});

function Header(props) {
  const { classes, onDrawerToggle, pageHeader } = props;

  return (
    <React.Fragment>
      <AppBar
        classes={{ root: classes.root }}
        color="primary"
        position="sticky"
        elevation={0}
      >
        <Toolbar>
          <Grid container spacing={8} alignItems="center">
            <Grid item xs>
              {!!pageHeader && (
                <Typography color="inherit" variant="h5" component="h1">
                  {pageHeader}
                </Typography>
              )}
            </Grid>
            <Hidden smUp>
              <Grid item>
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={onDrawerToggle}
                  className={classes.menuButton}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            </Hidden>
            <Grid item xs />
            <Grid item>
              <Tooltip title="Help">
                <IconButton color="inherit">
                  <HelpIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  onDrawerToggle: PropTypes.func.isRequired,
  pageHeader: PropTypes.string
};

export default withStyles(styles)(Header);
