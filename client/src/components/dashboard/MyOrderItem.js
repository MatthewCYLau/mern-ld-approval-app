import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { ListGroup } from "react-bootstrap";
import { connect } from "react-redux";
import { addLike, removeLike } from "../../actions/course";
import { Badge } from "react-bootstrap";

const OrderItem = ({ order: { course, date, approved } }) => (
  <div>
    <ListGroup.Item>
      <a className="course-name" href={course.url}>
        <h4>{course.name}</h4>
      </a>
      <p>Provider: {course.provider}</p>
      <p>Price: {course.price}</p>
      <p>
        Applied on <Moment format="DD/MM/YYYY">{date}</Moment>
      </p>

      {approved ? (
        <Badge variant="success">Approved</Badge>
      ) : (
        <Badge variant="warning">Pending</Badge>
      )}
    </ListGroup.Item>
  </div>
);

OrderItem.defaultProps = {
  showActions: true
};

OrderItem.propTypes = {
  order: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addLike, removeLike })(OrderItem);
