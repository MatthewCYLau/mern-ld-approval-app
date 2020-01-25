import { combineReducers } from "redux";
import auth from "./auth";
import alert from "./alert";
import course from "./course";
import order from "./order";

export default combineReducers({
  auth,
  alert,
  course,
  order
});
