import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addCourse } from "../../actions/course";
import { Form, Button } from "react-bootstrap";

const AddCourse = ({ addCourse, history }) => {
  const [formData, setFormData] = useState({
    name: "",
    provider: ""
  });

  const { name, provider } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    addCourse(formData, history);
  };

  return (
    <Fragment>
      <h1>AddCourse</h1>

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
