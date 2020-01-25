import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import CourseItem from "./CourseItem";
import { getCourses } from "../../actions/course";
import { ListGroup } from "react-bootstrap";

const Courses = ({ getCourses, course: { courses, loading }, ...rest }) => {
  useEffect(() => {
    getCourses();
  }, [getCourses]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">All Courses</h1>
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
  );
};

Courses.propTypes = {
  getCourses: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  course: state.course
});

export default connect(mapStateToProps, { getCourses })(Courses);
