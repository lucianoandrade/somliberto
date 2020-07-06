import React from "react";
import PropTypes from "prop-types";
import { ErrorMessage, Field } from "formik";
import MaskedInput from 'react-text-mask';

import "./input.scss";

const MaskFormikInput = props => {

  const {
    id = "id",
    type = PropTypes.string || "text",
    name = "name",
    placeholder = "placeholder",
    label = "label",
    disabled = false,
    required = false,
    mask,
  } = props;

  return (
    <>  
        <fieldset className="field"> 
            <label className="label" htmlFor={id}>{label}</label>
            <Field name={name}> 
              {({ field }) => {
                return <MaskedInput mask={mask} 
                {...field}
                className="input"
                id={id}
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                required={required} />
              }} 
            </Field>
            <ErrorMessage name={name}>
            {msg => <div className="messageError">{msg}</div>}
            </ErrorMessage>
        </fieldset>
    </>
  );
};
  

MaskFormikInput.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string
  };
  
export default MaskFormikInput;