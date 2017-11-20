//SurveyForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import { Link } from 'react-router-dom';

const FIELDS = [{ label: 'Survey Title', name: 'title', validationError: 'Please provide a title for your survey' }, { label: 'Subject Line', name: 'subject', validationError: 'Please provide a subject for your survey' }, { label: 'Email body', name: 'body', validationError: 'Please provide a survey question' }, { label: 'Recepient List', name: 'emails', validationError: 'Please provide a list of emails' }];

class SurveyForm extends Component {
  renderFields() {
    return _.map(FIELDS, ({ label, name }) => {
      return <Field key={name} component={SurveyField} type="text" label={label} name={name} />;
    });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
          {this.renderFields()}

          <button type="submit" className="teal btn-flat white-text right">
            <i className="material-icons">done</i>
          </button>
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  _.each(FIELDS, ({ name, validationError }) => {
    if (!values[name]) {
      errors[name] = validationError;
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: 'surveyForm'
})(SurveyForm);
