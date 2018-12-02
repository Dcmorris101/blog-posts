import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost} from '../actions';

class PostsNew extends Component {
  renderField(field) { // this field object contains event handlers that we need to wire up to the JSX we are returning
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
      <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          // "..." means this is an object and i want all of the different
          // properties in this object to be communicated as props to the input tag
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
      // touched is from redux form
    );
  }

  onSubmit(values) {
    this.props.createPost(values, () => {
      // history prop comes from index file Route creating the component. Needs to match one of the routes of the application
      this.props.history.push('/');
    });
  }

  render() {
    const { handleSubmit } = this.props; // handleSubmit is a property being passed to the component on behalf of reduxForm

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title"
          name="title"
          component={this.renderField}
        />
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
        />
        <Field
          label="Post Content"
          name="content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger cancel-button">Cancel</Link>
      </form>
    );
  }
}

function validate(values) {
  // console.log(values) -> { title: 'asdf', categories: 'asdsdf', content: 'dfsdf'}
  const errors = {};

  // Validate inputs from 'values'. Must be identical to Field names for errors to show up correctly
  if (!values.title || values.title.length < 3) {
    errors.title = "Enter a title that is at least 3 characters.";
  }
  if (!values.categories) {
    errors.categories = "Enter some categories.";
  }
  if (!values.content) {
    errors.content = "Enter some content.";
  }

  // if errors is empty, the form is fine to submit
  // if errors has any properties, redux form assumes form is invalid
  return errors;
}

// helper that allows our redux form to communicate directly
// from the component to the reducer that we have already set up
export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(null,{ createPost })(PostsNew)
);
