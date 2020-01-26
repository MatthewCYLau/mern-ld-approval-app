import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MyOrderItem from "./MyOrderItem";
import { getMyOrders } from "../../actions/order";
import { ListGroup } from "react-bootstrap";

const Dashboard = ({
  getMyOrders,
  order: { orders, loading },
  auth: { user }
}) => {
  useEffect(() => {
    getMyOrders();
  }, [getMyOrders]);
  return (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome {user && user.name}
      </p>
      <ListGroup>
        {orders.map(order => (
          <MyOrderItem key={order._id} order={order} />
        ))}
      </ListGroup>
    </Fragment>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  getMyOrders: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  order: state.order
});

export default connect(mapStateToProps, { getMyOrders })(Dashboard);
