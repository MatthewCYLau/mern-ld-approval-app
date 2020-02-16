import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import CourseItem from "./CourseItem";
import { getApprovedCourses } from "../../actions/course";
import { ListGroup } from "react-bootstrap";
import Intro from "../layout/Intro";


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
      <Intro  componentName="Course Catalogue" componentHeadline="View all courses recommended by SE practitioners"/>
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
