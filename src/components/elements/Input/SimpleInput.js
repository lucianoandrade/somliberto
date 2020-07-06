import React from "react";
import PropTypes from 'prop-types';
import "./input.scss";

const SimpleInput = props => {
  const {
    id = "id",
    type = PropTypes.string || "text",
    name = "name",
    placeholder = "placeholder",
    label = "label",
    disabled = false,
    required = false,
    onChange,
    value,
  } = props;

  return (
    <>
      <fieldset className="field">
        <label className="label" htmlFor={id}>{label}</label>
        <input
          className="input"
          id={id}
          type={type}
          name={name}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          onChange={onChange}
          value={value} 
        />
      </fieldset>
    </>
  );
};

SimpleInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string
};


export default SimpleInput;
