import React, { Fragment } from "react";
import loader from "./loader.gif";

export default () => (
  <Fragment>
    <img src={loader} className="center small-loader" alt="loader" />
  </Fragment>
);
