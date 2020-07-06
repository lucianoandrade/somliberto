import React, { useState } from "react";
import PropTypes from 'prop-types';
import "./lightBox.scss";

import Botao from "../../elements/Botao";

const LightBox = props => {
  const {
    link = "link",
    title = "Titulo da lightBox",
    children = "Texto da lightBox",
    btnText = "Texto do botão"
  } = props;

  const [open, setOpen] = useState({ display: "none" });

  const abrir = () => setOpen({ display: "block" });
  const fechar = () => setOpen({ display: "none" });

  return (
    <>
      <div className="link" onClick={abrir}>
        <p className="linkStyle">{link}</p>
      </div>
      <div style={open} className="opacity"></div>
      <div style={open} className="box">
        <h3 className="title">{title}</h3>
        <div className="text">{children}</div>
        <Botao classes="red big" onClick={fechar}>
          {btnText}
        </Botao>
      </div>
    </>
  );
};

LightBox.propTypes = {
  title: PropTypes.string.isRequired,
  btnText: PropTypes.string,
};


export default LightBox;
