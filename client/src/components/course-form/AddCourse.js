import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addCourse } from "../../actions/course";
import { Form, Button } from "react-bootstrap";

const AddCourse = ({ addCourse, history }) => {
  const [formData, setFormData] = useState({
    name: "",
    provider: "",
    url: "",
    price: 0
  });

  const { name, provider, url, price } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    addCourse(formData, history);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Add Course</h1>
      <p className="lead">
        <i className="fas fa-plus" />
        Recommend a new course to the course catalogue
      </p>

      <Form onSubmit={e => onSubmit(e)}>
        <Form.Group>
          <Form.Label>Course Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Course Name"
            name="name"
            value={name}
            onChange={e => onChange(e)}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Course Provider</Form.Label>
          <Form.Control
            type="text"
            placeholder="Course Provider"
            name="provider"
            value={provider}
            onChange={e => onChange(e)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Course URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Course URL"
            name="url"
            value={url}
            onChange={e => onChange(e)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="text"
            placeholder="Price"
            name="price"
            value={price}
            onChange={e => onChange(e)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Course
        </Button>
      </Form>
    </Fragment>
  );
};

AddCourse.propTypes = {
  addCourse: PropTypes.func.isRequired
};

export default connect(null, { addCourse })(AddCourse);
