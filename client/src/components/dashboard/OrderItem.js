import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { ListGroup, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { addLike, removeLike } from "../../actions/course";
import { approveOrder } from "../../actions/order";
import { Badge } from "react-bootstrap";
import Chip from "@material-ui/core/Chip";

const OrderItem = ({
  order: { course, date, approved, user, _id },
  isAdmin,
  approveOrder
}) => (
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
      {isAdmin && <p>{user.name}</p>}
      {approved ? (
        <Chip color="primary" label="Approved" />
      ) : (
        <Chip label="Pending" />
      ), 
      (<Chip color="danger" label="Delete"/>)}
      {isAdmin && (
        <Button
          className="action-btn"
          variant="success"
          onClick={() => approveOrder(_id)}
        >
          Approve
        </Button>
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
  approveOrder: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addLike, removeLike, approveOrder })(
  OrderItem
);
