import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_COURSES,
  GET_APPROVED_COURSES,
  COURSE_ERROR,
  UPDATE_LIKES,
  DELETE_COURSE,
  ADD_COURSE,
  GET_COURSE
} from "./types";

// Get courses
export const getCourses = () => async dispatch => {
  try {
    const res = await axios.get("/api/courses");

    dispatch({
      type: GET_COURSES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: COURSE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get approved courses
export const getApprovedCourses = () => async dispatch => {
  try {
    const res = await axios.get("/api/courses/approved");

    dispatch({
      type: GET_APPROVED_COURSES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: COURSE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add like
export const addLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/courses/like/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: COURSE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Remove like
export const removeLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/courses/unlike/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: COURSE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete course
export const deleteCourse = id => async dispatch => {
  try {
    await axios.delete(`/api/courses/${id}`);

    dispatch({
      type: DELETE_COURSE,
      payload: id
    });

    dispatch(setAlert("Course Removed", "success"));
  } catch (err) {
    dispatch({
      type: COURSE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add course
export const addCourse = (formData, history) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.post("/api/courses", formData, config);

    dispatch({
      type: ADD_COURSE,
      payload: res.data
    });
    history.push("/dashboard");
    dispatch(
      setAlert(
        "Thank you for submission! Your recommendation is now under review.",
        "success",
        6000
      )
    );
  } catch (err) {
    dispatch({
      type: COURSE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get course
export const getCourse = id => async dispatch => {
  try {
    const res = await axios.get(`/api/courses/${id}`);

    dispatch({
      type: GET_COURSE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: COURSE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
