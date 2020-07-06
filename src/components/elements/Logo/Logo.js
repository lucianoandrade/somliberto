import React from "react";
import './logo.scss';
import { Link } from "react-router-dom";

const Logo = props => {
  const { isBlack } = props;
  const color = isBlack ? "" : "black";

  return (
    <>
        <h1 className={`SomLivreLogo ${color}`}><Link to='/' title="Som Livre">Som Livre</Link></h1>
    </>
  );
};

export default Logo;
