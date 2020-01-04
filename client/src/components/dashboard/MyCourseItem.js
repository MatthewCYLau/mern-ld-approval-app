import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { ListGroup } from "react-bootstrap";
import { connect } from "react-redux";
import { addLike, removeLike } from "../../actions/course";
import { Badge } from "react-bootstrap";

const CourseItem = ({ course: { _id, name, provider, date, approved } }) => (
  <div>
    <ListGroup.Item>
      <h3>{name}</h3>
      <p>Provider: {provider}</p>
      <p className="course-date">
        Added on <Moment format="YYYY/MM/DD">{date}</Moment>
      </p>
      {approved ? (
        <Badge variant="success">Approved</Badge>
      ) : (
        <Badge variant="warning">Pending</Badge>
      )}
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
