import {
  GET_COURSES,
  GET_MY_COURSES,
  COURSE_ERROR,
  UPDATE_LIKES,
  DELETE_COURSE,
  ADD_COURSE,
  GET_COURSE,
  GET_APPROVED_COURSES
} from "../actions/types";

const initialState = {
  courses: [],
  course: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_COURSES:
    case GET_MY_COURSES:
    case GET_APPROVED_COURSES:
      return {
        ...state,
        courses: payload,
        loading: false
      };
    case GET_COURSE:
      return {
        ...state,
        course: payload,
        loading: false
      };
    case ADD_COURSE:
      return {
        ...state,
        courses: [payload, ...state.courses],
        loading: false
      };
    case DELETE_COURSE:
      return {
        ...state,
        courses: state.courses.filter(course => course._id !== payload),
        loading: false
      };
    case COURSE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case UPDATE_LIKES:
      return {
        ...state,
        courses: state.courses.map(course =>
          course._id === payload.id
            ? { ...course, likes: payload.likes }
            : course
        ),
        loading: false
      };
    default:
      return state;
  }
}
