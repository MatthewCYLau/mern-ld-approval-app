import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import CourseItem from "./CourseItem";
import { getApprovedCourses } from "../../actions/course";
import { ListGroup } from "react-bootstrap";

const Courses = ({
  getApprovedCourses,
  course: { courses, loading },
  ...rest
}) => {
  useEffect(() => {
    getApprovedCourses();
  }, [getApprovedCourses]);

  return loading ? (
    <Spinner />
  ) : (
    <div className="container">
      <Fragment>
        <h1 className="large text-primary">Course Catalogue</h1>
        <p className="lead">
          <i className="fas fa-book-open" />
          View all courses recommended by SE practitioners
        </p>
        <div className="courses">
          <ListGroup>
            {courses.map(course => (
              <CourseItem key={course._id} course={course} {...rest} />
            ))}
          </ListGroup>
        </div>
      </Fragment>
    </div>
  );
};

Courses.propTypes = {
  getApprovedCourses: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  course: state.course
});

export default connect(mapStateToProps, { getApprovedCourses })(Courses);
