import React from "react";
import removeIcon from "../../../assets/img/remove-icon.svg";
import './RemoveIcon.scss';


const RemoveIcon = props => {
  return (
    <div className="remove">
      <img
        src={removeIcon}
        alt="Remover"
      ></img>
      {props.children}
    </div>
  );
};

export default RemoveIcon;
