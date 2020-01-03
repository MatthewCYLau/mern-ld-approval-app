import { combineReducers } from "redux";
import auth from "./auth";
import alert from "./alert";
import course from "./course";

export default combineReducers({
  auth,
  alert,
  course
});
