import React from "react";
import { Route, Switch } from "react-router-dom";
import Register from "../auth/Register";
import Login from "../auth/Login";
import Dashboard from "../dashboard/Dashboard";
import Admin from "../admin/Admin";
import Alert from "../layout/Alert";
import Courses from "../courses/Courses";
import AddCourse from "../course-form/AddCourse";
import NotFound from "../layout/NotFound";
import PrivateRoute from "../routing/PrivateRoute";

const Routes = () => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path="/sign-up" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/admin" component={Admin} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/courses" component={Courses} />
        <PrivateRoute exact path="/add-course" component={AddCourse} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
