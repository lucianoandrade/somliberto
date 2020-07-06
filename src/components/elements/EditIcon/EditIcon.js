import React from "react";
import editIcon from "../../../assets/img/edit-icon.svg";
import './EditIcon.scss';


const EditIcon = props => {
  return (
    <div className="edit">
      <img
        src={editIcon}
        alt="Editar"
      ></img>
      {props.children}
    </div>
  );
};

export default EditIcon;
