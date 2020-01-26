import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import { Navbar, Nav } from "react-bootstrap";

const AppNavbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <Nav className="mr-auto">
      <Nav.Link href="/dashboard">
        <i className="fas fa-user" />
        Dashboard
      </Nav.Link>
      <Nav.Link href="/add-course">
        <i className="fas fa-plus" />
        Add Course
      </Nav.Link>
      <Nav.Link href="/courses">
        <i className="fas fa-book-open" />
        Course Catalogue
      </Nav.Link>
      <Nav.Link href="#!" onClick={logout}>
        <i className="fas fa-sign-out-alt" />
        Logout
      </Nav.Link>
    </Nav>
  );

  const guestLinks = (
    <Nav className="mr-auto">
      <Nav.Link href="/sign-up">Sign Up</Nav.Link>
      <Nav.Link href="/login">Login</Nav.Link>
    </Nav>
  );

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">
        <i className="fas fa-code" /> SE Learning and Development Portal
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        {!loading && (
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        )}
      </Navbar.Collapse>
    </Navbar>
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
