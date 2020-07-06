import React, { useState } from "react";
import { withRouter } from 'react-router-dom';
import { Auth } from "aws-amplify"
import { SimpleInput } from "../../components/elements/Input";
import Botao from "../../components/elements/Botao";
import PageContainer from "../../components/features/PageContainer/PageContainer";
import "./ForgotPassword.scss";

function ForgotPassword(props) {

  const [email, setEmail] = useState("");
  const forgotPassword = (ev) => {
    ev.preventDefault()
    Auth.forgotPassword(email)
    .then(data => {
        props.history.push('/codconfirmacao', {email: email, pathname: props.location.pathname})
    })
    .catch(err => {
        console.log('ERROR', err)
        if(err.code === err.name) {
            props.history.push('/error', { message: err.message });
          }
    })
}

  return (
    <PageContainer>
      <section className="container-Forgot-Password">
        <div className="ForgotPassword">
          <h2 className="title">Esqueceu sua senha?</h2>

          <form className="form" onSubmit={forgotPassword}>
            <p>Insira o e-mail que utiliza em nossa plataforma.</p>
            <SimpleInput
              id="email"
              type="email"
              name="email"
              placeholder="Ex: seunome@email.com"
              label="E-mail"
              onChange={e => setEmail(e.target.value)}
              required={true}
            />
            <Botao className="botao" classes="red big">
                Próximo
            </Botao>
          </form>
        </div>
      </section>
    </PageContainer>
  );
}

export default withRouter(ForgotPassword);
