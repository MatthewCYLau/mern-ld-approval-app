import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MyCourseItem from "./MyCourseItem";
import { getMyCourses } from "../../actions/course";
import { ListGroup } from "react-bootstrap";

const Dashboard = ({
  getMyCourses,
  course: { courses, loading },
  auth: { user }
}) => {
  useEffect(() => {
    getMyCourses();
  }, [getMyCourses]);
  return (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome {user && user.name}
      </p>
      <ListGroup>
        {courses.map(course => (
          <MyCourseItem key={course._id} course={course} />
        ))}
      </ListGroup>
    </Fragment>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  getMyCourses: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  course: state.course
});

export default connect(mapStateToProps, { getMyCourses })(Dashboard);
