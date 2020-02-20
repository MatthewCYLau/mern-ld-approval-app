import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { ListGroup } from "react-bootstrap";
import { connect } from "react-redux";
import { addLike, removeLike } from "../../actions/course";
import { addOrder } from "../../actions/order";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

const leverageStyles = makeStyles({
  gridItem: {
    "& a": { textDecoration: "none" }
  }
  // approveButton: {
  //   margin: "0 1rem"
  // }
});

const CourseItem = ({
  addLike,
  removeLike,
  addOrder,
  history,
  course: { _id, name, provider, price, likes, url }
}) => {
  const classes = leverageStyles();
  return (
    <Grid item className={classes.gridItem}>
      <Card variant="outlined">
        <CardActionArea href={url}>
          <CardContent>
            <Typography component="h2" variant="h5">
              {name}
            </Typography>
            <Typography variant="subtitle1">Provider: {provider}</Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Price: {price}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardContent>
          <Button
            variant="contained"
            color="primary"
            onClick={() => addOrder(_id, history)}
          >
            Apply
          </Button>
          <Button onClick={() => addLike(_id)}>
            <i className="fas fa-thumbs-up" />{" "}
            <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
          </Button>
          <Button onClick={() => removeLike(_id)}>
            <i className="fas fa-thumbs-down" />
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );

  // <div>
  //   <ListGroup.Item>
  //     <a className="course-name" href={url}>
  //       <h4>{name}</h4>
  //     </a>
  //     <p>Provider: {provider}</p>
  //     <p>Price: {price}</p>
  //     <Button variant="success" onClick={() => addOrder(_id, history)}>
  //       Apply
  //     </Button>
  //     <Fragment>
  //       <button
  //         onClick={() => addLike(_id)}
  //         type="button"
  //         className="btn btn-light"
  //       >
  //         <i className="fas fa-thumbs-up" />{" "}
  //         <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
  //       </button>
  //       <button
  //         onClick={() => removeLike(_id)}
  //         type="button"
  //         className="btn btn-light"
  //       >
  //         <i className="fas fa-thumbs-down" />
  //       </button>
  //     </Fragment>
  //   </ListGroup.Item>
  // </div>
};

CourseItem.defaultProps = {
  showActions: true
};

CourseItem.propTypes = {
  course: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  addOrder: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  addLike,
  removeLike,
  addOrder
})(CourseItem);
