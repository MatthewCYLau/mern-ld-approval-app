import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import OrderItem from "../dashboard/OrderItem";
import { getOrders } from "../../actions/order";
import { ListGroup } from "react-bootstrap";
import Spinner from "../layout/Spinner";

const Admin = ({ getOrders, order: { orders, loading }, auth: { user } }) => {
  useEffect(() => {
    getOrders();
  }, [getOrders]);
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container">
        <h1 className="large text-primary">Admin</h1>
        <p className="lead">
          <i className="fas fa-user" /> Welcome Admin {user && user.name}
        </p>
        <p>
          Here are the all orders across the portal, and their approval status.
        </p>
        <ListGroup>
          {orders.map(order => (
            <OrderItem key={order._id} order={order} isAdmin={true} />
          ))}
        </ListGroup>
      </div>
    </Fragment>
  );
};

Admin.propTypes = {
  auth: PropTypes.object.isRequired,
  getOrders: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  order: state.order
});

export default connect(mapStateToProps, { getOrders })(Admin);
