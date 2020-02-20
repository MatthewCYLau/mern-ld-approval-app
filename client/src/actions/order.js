import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_ORDERS,
  GET_MY_ORDERS,
  ORDER_ERROR,
  DELETE_ORDER,
  ADD_ORDER,
  GET_ORDER,
  APPROVE_ORDER
} from "./types";

// Get orders
export const getOrders = () => async dispatch => {
  try {
    const res = await axios.get("/api/orders");

    dispatch({
      type: GET_ORDERS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ORDER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get my orders
export const getMyOrders = () => async dispatch => {
  try {
    const res = await axios.get("/api/orders/me");

    dispatch({
      type: GET_MY_ORDERS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ORDER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete order
export const deleteOrder = id => async dispatch => {
  try {
    await axios.delete(`/api/orders/${id}`);

    dispatch({
      type: DELETE_ORDER,
      payload: res.data
    });

    dispatch(setAlert("Order Withdrawn", "success"));
  } catch (err) {
    dispatch({
      type: ORDER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add order
export const addOrder = (courseId, history) => async dispatch => {
  const formData = {
    course: courseId
  };

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.post("/api/orders", formData, config);

    dispatch({
      type: ADD_ORDER,
      payload: res.data
    });
    history.push("/dashboard");
    dispatch(setAlert("Course applied!", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "error")));
    }
    dispatch({
      type: ORDER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Approve order
export const approveOrder = orderId => async dispatch => {
  try {
    const formData = {
      approved: true
    };

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const res = await axios.patch(`/api/orders/${orderId}`, formData, config);

    dispatch({
      type: APPROVE_ORDER,
      payload: res.data
    });

    dispatch(setAlert("Order Approved", "success"));
  } catch (err) {
    dispatch({
      type: ORDER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get order
export const getOrder = id => async dispatch => {
  try {
    const res = await axios.get(`/api/orders/${id}`);

    dispatch({
      type: GET_ORDER,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ORDER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
