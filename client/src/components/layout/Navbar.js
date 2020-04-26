import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";

const leverageStyles = makeStyles(theme => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none"
    }
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  toolbar: {
    flexWrap: "wrap"
  },
  toolbarTitle: {
    flexGrow: 1
  },
  link: {
    margin: theme.spacing(1, 1.5)
  }
}));

const AppNavbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const classes = leverageStyles();
  const authLinks = (
    <nav>
      <Link
        variant="button"
        color="textPrimary"
        href="/dashboard"
        className={classes.link}
      >
        <i className="fas fa-user" />
        Dashboard
      </Link>
      <Link
        variant="button"
        color="textPrimary"
        href="/add-course"
        className={classes.link}
      >
        <i className="fas fa-plus" />
        Add Course
      </Link>
      <Link
        variant="button"
        color="textPrimary"
        href="/courses"
        className={classes.link}
      >
        <i className="fas fa-book-open" />
        Course Catalogue
      </Link>
      <Link
        variant="button"
        color="textPrimary"
        href="#!"
        className={classes.link}
        onClick={logout}
      >
        <i className="fas fa-sign-out-alt" />
        Logout
      </Link>
    </nav>
  );

  const guestLinks = (
    <nav>
      <Link
        variant="button"
        color="textPrimary"
        href="/sign-up"
        className={classes.link}
      >
        Sign Up
      </Link>
      <Link
        variant="button"
        color="textPrimary"
        href="/login"
        className={classes.link}
      >
        Login
      </Link>
    </nav>
  );

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      className={classes.appBar}
    >
      <Toolbar className={classes.toolbar}>
        <Typography
          variant="h6"
          color="inherit"
          noWrap
          className={classes.toolbarTitle}
        >
          <Link href="/" color="textPrimary">
            <i className="fas fa-code" /> Systems Engineering Learning and
            Development Portal
          </Link>
        </Typography>
        {!loading && (
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        )}
      </Toolbar>
    </AppBar>
  );
};

AppNavbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(AppNavbar);
