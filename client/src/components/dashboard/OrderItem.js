import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { ListGroup, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { addLike, removeLike } from "../../actions/course";
import { approveOrder } from "../../actions/order";
import Chip from "@material-ui/core/Chip";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Hidden from "@material-ui/core/Hidden";

const leverageStyles = makeStyles({
  cardActionArea: {
    "& a": { textDecoration: "none" }
  }
});

const OrderItem = ({
  order: { course, date, approved, user, _id },
  isAdmin,
  approveOrder
}) => {
  const classes = leverageStyles();
  return (
    <Grid item className={classes.cardActionArea}>
      <CardActionArea href={course.url}>
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5">
                {course.name}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {course.provider}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {course.price}
              </Typography>
              {approved ? (
                <Chip color="primary" label="Approved" />
              ) : (
                <Chip label="Pending" />
              )}
            </CardContent>
          </div>
        </Card>
      </CardActionArea>
    </Grid>

    // <div>
    //   <ListGroup.Item>
    //     <a className="course-name" href={course.url}>
    //       <h4>{course.name}</h4>
    //     </a>
    //     <p>Provider: {course.provider}</p>
    //     <p>Price: {course.price}</p>
    //     <p>
    //       Applied on <Moment format="DD/MM/YYYY">{date}</Moment>
    //     </p>
    //     {isAdmin && <p>{user.name}</p>}
    //     {approved ? (
    //       <Chip color="primary" label="Approved" />
    //     ) : (
    //       <Chip label="Pending" />
    //     )}
    //     {isAdmin && (
    //       <Button
    //         className="action-btn"
    //         variant="success"
    //         onClick={() => approveOrder(_id)}
    //       >
    //         Approve
    //       </Button>
    //     )}
    //   </ListGroup.Item>
    // </div>
  );
};

OrderItem.defaultProps = {
  showActions: true
};

OrderItem.propTypes = {
  order: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  approveOrder: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addLike, removeLike, approveOrder })(
  OrderItem
);
