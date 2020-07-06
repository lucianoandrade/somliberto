import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import Logo from "../../elements/Logo";
import Menu from "./Menu";

import "./header.scss";

const Header = props => {
  const routerBlack = [
    "/login",
    "/cadastro",
    "/codconfirmacao",
    "/seusdados",
    "/novasenha",
    "/esquecisenha",
    "/redefinirsenha",
    "/perfil",
    "/editarperfil"
  ];

  const [isBlack, setIsBlack] = useState(false);
  const color = isBlack ? "black" : "";

  useEffect(() => {
    setIsBlack(routerBlack.find(item => item === props.location.pathname));
    // eslint-disable-next-line
  }, [props.location]);

  return (
    <header id="Header" className={color}>
      <Logo isBlack={isBlack} />
      <Menu isBlack={isBlack} {...props}/>
    </header>
  );
};

export default withRouter(Header);
