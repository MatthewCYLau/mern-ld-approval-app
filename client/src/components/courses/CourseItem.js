import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addLike, removeLike } from "../../actions/course";

const CourseItem = ({
  addLike,
  removeLike,
  course: { _id, name, provider, likes, date }
}) => (
  <div className="course bg-white p-1 my-1">
    <div>
      <p className="my-1">{name}</p>
      <p className="my-1">{provider}</p>
      <p className="course-date">
        Course added on <Moment format="YYYY/MM/DD">{date}</Moment>
      </p>
      <Fragment>
        <button
          onClick={() => addLike(_id)}
          type="button"
          className="btn btn-light"
        >
          <i className="fas fa-thumbs-up" />{" "}
          <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
        </button>
        <button
          onClick={() => removeLike(_id)}
          type="button"
          className="btn btn-light"
        >
          <i className="fas fa-thumbs-down" />
        </button>
      </Fragment>
    </div>
  </div>
);

CourseItem.defaultProps = {
  showActions: true
};

CourseItem.propTypes = {
  course: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addLike, removeLike })(CourseItem);
