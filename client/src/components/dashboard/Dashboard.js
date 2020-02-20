import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import OrderItem from "./OrderItem";
import Intro from "../layout/Intro";
import { getMyOrders } from "../../actions/order";
import { ListGroup } from "react-bootstrap";
import Spinner from "../layout/Spinner";

const Dashboard = ({
  getMyOrders,
  order: { orders, loading },
  auth: { user }
}) => {
  useEffect(() => {
    getMyOrders();
  }, [getMyOrders]);
  return loading ? (
    <Spinner />
  ) : (
    <div className="container">
      <Fragment>
        <Intro componentName="Dashboard" username={user && user.name} componentHeadline="Here are the courses you have applied, and their approval status."/>
        <ListGroup>
          {orders.map(order => (
            <OrderItem key={order._id} order={order} isAdmin={true} />
          ))}
        </ListGroup>
      </Fragment>
    </div>
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
