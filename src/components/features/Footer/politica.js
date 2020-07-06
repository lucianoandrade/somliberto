import React from "react";
import LightBox from "../LightBox/lightBox";

export default function politica(props) {
  const privacyPolicy = props.privacyPolicy
  return (
    <LightBox
      link="Políticas de Privacidade"
      btnText="Fechar"
      title="Políticas de Privacidade"
    >
      {privacyPolicy &&
        <p dangerouslySetInnerHTML={{__html:privacyPolicy}}></p>
      }
    </LightBox>
  );
}
