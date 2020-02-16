import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addCourse } from "../../actions/course";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const leverageStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const AddCourse = ({ addCourse, history }) => {
  const classes = leverageStyles();
  const [formData, setFormData] = useState({
    name: "",
    provider: "",
    url: "",
    price: null
  });

  const { name, provider, url, price } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    addCourse(formData, history);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AddCircleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Make course recommendation
        </Typography>
        <form className={classes.form} noValidate onSubmit={e => onSubmit(e)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Course Name"
            name="name"
            autoFocus
            value={name}
            onChange={e => onChange(e)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="provider"
            label="Course Provider"
            name="provider"
            value={provider}
            onChange={e => onChange(e)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="url"
            label="Course URL"
            name="url"
            value={url}
            onChange={e => onChange(e)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="price"
            label="Price"
            name="price"
            value={price}
            onChange={e => onChange(e)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Add Course
          </Button>
        </form>
      </div>
    </Container>
  );

  //   <div className="container">
  //     <Fragment>
  //       <h1 className="large text-primary">Add Course</h1>
  //       <p className="lead">
  //         <i className="fas fa-plus" />
  //         Recommend a new course to the course catalogue
  //       </p>

  //       <Form onSubmit={e => onSubmit(e)}>
  //         <Form.Group>
  //           <Form.Label>Course Name</Form.Label>
  //           <Form.Control
  //             type="text"
  //             placeholder="Course Name"
  //             name="name"
  //             value={name}
  //             onChange={e => onChange(e)}
  //             required
  //           />
  //         </Form.Group>
  //         <Form.Group>
  //           <Form.Label>Course Provider</Form.Label>
  //           <Form.Control
  //             type="text"
  //             placeholder="Course Provider"
  //             name="provider"
  //             value={provider}
  //             onChange={e => onChange(e)}
  //           />
  //         </Form.Group>
  //         <Form.Group>
  //           <Form.Label>Course URL</Form.Label>
  //           <Form.Control
  //             type="text"
  //             placeholder="Course URL"
  //             name="url"
  //             value={url}
  //             onChange={e => onChange(e)}
  //           />
  //         </Form.Group>
  //         <Form.Group>
  //           <Form.Label>Price</Form.Label>
  //           <Form.Control
  //             type="text"
  //             placeholder="Price"
  //             name="price"
  //             value={price}
  //             onChange={e => onChange(e)}
  //           />
  //         </Form.Group>
  //         <Button variant="primary" type="submit">
  //           Add Course
  //         </Button>
  //       </Form>
  //     </Fragment>
  //   </div>
  // );
};

AddCourse.propTypes = {
  addCourse: PropTypes.func.isRequired
};

export default connect(null, { addCourse })(AddCourse);
