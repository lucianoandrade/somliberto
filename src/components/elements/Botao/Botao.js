import React from "react";
import './botao.scss';

const Botao = props => {
  const { classes = "", children="Botão"} = props;

  // usar as classes: black / red / big

  return (
    <>
      <button className={`btn ${classes}`} type="submit" onClick={props.onClick}>{children}</button>
    </>
  );
};

export default Botao;
