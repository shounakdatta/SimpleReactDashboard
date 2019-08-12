const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  headerText: {
    marginTop: theme.spacing.unit,
    fontWeight: "300"
  },
  form: {
    width: "100%" // Fix IE 11 issue.
  },
  submit: {
    marginTop: `${theme.spacing.unit}px !important`,
    marginBottom: `${theme.spacing.unit * 2}px !important`
  },
  secondaryTextContainer: {
    display: "flex",
    justifyContent: "center",
    padding: 2
  },
  secondaryText: {
    fontWeight: "300"
  },
  successTextContainer: {
    display: "flex",
    justifyContent: "center",
    paddingTop: 20,
    paddingBottom: 20
  },
  successText: {
    fontWeight: "300"
  },
  linkText: {
    textDecoration: "none",
    color: theme.palette.primary.dark
  }
});

export default styles;
