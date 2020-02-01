import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { ListGroup, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { addLike, removeLike } from "../../actions/course";
import { addOrder } from "../../actions/order";

const CourseItem = ({
  addLike,
  removeLike,
  addOrder,
  history,
  course: { _id, name, provider, price, likes, url }
}) => {
  return (
    <div>
      <ListGroup.Item>
        <a className="course-name" href={url}>
          <h4>{name}</h4>
        </a>
        <p>Provider: {provider}</p>
        <p>Price: {price}</p>
        <Button variant="success" onClick={() => addOrder(_id, history)}>
          Apply
        </Button>
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
};

CourseItem.defaultProps = {
  showActions: true
};

CourseItem.propTypes = {
  course: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  addOrder: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  addLike,
  removeLike,
  addOrder
})(CourseItem);
