import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import ReactGA from "react-ga";

function Analitycs(props) {
  useEffect(() => {
    // ReactGA.initialize("UA-143781898-1");
  }, []);

  useEffect(() => {
    console.log("here ga");
    // if(window.location.origin !== 'https://aunelive.com.br') return;
    // ReactGA.pageview(props.location.pathname);
  }, [props.location]);

  return <div />;
}

export const analyticsEvent = (clickElement, unit) => {
  const type =
    {
      agendamento: {
        category: "Click - Agendamento",
        action: `Click - Botão agendamento - Unidade ${unit}`,
        label: "click - Agendamento"
      },
      whatsapp: {
        category: "Click - Agendamento",
        action: `Click - Botão whatsapp - Unidade ${unit}`,
        label: "click - Agendamento"
      },
      sejaUmFranqueado: {
        category: "Click - Formulário - Seja um Franqueado",
        action: "Click - Formulário - Seja um Franqueado",
        label: "Click - Formulário - Seja um Franqueado"
      },
      contato: {
        category: "Click - Formulário - Contato",
        action: "Click - Formulário - Contato",
        label: "Click - Formulário - Contato"
      }
    }[clickElement] || "";
  console.log(type);
  ReactGA.event({
    category: type.category,
    action: type.action,
    label: type.label
  });
  ReactGA.ga("send", "pageview", "/mypage");
};

export default withRouter(Analitycs);
