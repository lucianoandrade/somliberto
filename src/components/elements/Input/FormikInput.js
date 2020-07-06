import React from "react";
import PropTypes from "prop-types";
import { ErrorMessage, Field } from "formik";

import "./input.scss";

const FormikInput = props => {

  const {
    id = "id",
    type = PropTypes.string || "text",
    name = "name",
    placeholder = "placeholder",
    label = "label",
    disabled = false,
    required = false,
    component,
  } = props;

  return (
    <>
      <fieldset className="field">
        <label className="label" htmlFor={id}>{label}</label>
        <Field
          className="input"
          id={id}
          type={type}
          name={name}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          component={component}         
        >
        </Field>  
        <ErrorMessage name={name}>
          {msg => <div className="messageError">{msg}</div>}
        </ErrorMessage>
      </fieldset>
    </>
  );
};

FormikInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string
};

export default FormikInput;