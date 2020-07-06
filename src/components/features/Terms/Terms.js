import React from "react";
import LightBox from "../LightBox/lightBox";

const Terms = (props) => {
  const linkText = props.linkText || "Termos de Uso"
  const terms = props.terms

  return (
    <LightBox
      link={linkText}
      btnText="Fechar"
      title="Termos de Uso"
    > {terms &&
        <p dangerouslySetInnerHTML={{__html:terms}}></p>
      }
    </LightBox>
  );
}
export default Terms;
