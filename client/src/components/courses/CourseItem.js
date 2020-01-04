import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { ListGroup } from "react-bootstrap";
import { connect } from "react-redux";
import { addLike, removeLike } from "../../actions/course";

const CourseItem = ({
  addLike,
  removeLike,
  course: { _id, name, provider, likes, date }
}) => (
  <div>
    <ListGroup.Item>
      <h3>{name}</h3>
      <p>Provider: {provider}</p>
      <p className="course-date">
        Added on <Moment format="DD/MM/YYYY">{date}</Moment>
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
    </ListGroup.Item>
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
