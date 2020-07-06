import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { SimpleInput }  from "../../components/elements/Input";
import Botao from "../../components/elements/Botao";
import PageContainer from "../../components/features/PageContainer/PageContainer";
import "./NewPassword.scss";

function ForgotPassword(props) {

  const [newPassword, setNewPassword] = useState("");
  const [confNewPassword, setConfNewPassword] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault()
    if (newPassword !== confNewPassword) {
        alert("As senhas digitadas não estão idênticas.");
    }
    Auth.forgotPasswordSubmit(props.history.location.state.email, props.history.location.state.code, newPassword)
    .then(data => {
        console.log('NOVO SENHA', data)
        props.history.push('/login')
        console.log(props)
        alert('Senha Trocada com Sucesso')
    })
    .catch(err => {
        console.log('ERROR', err)
        if(err.code === 'CodeMismatchException') {
            props.history.push('/codconfirmacao', { email: props.history.location.state.email });
            alert('Código invalido')
          } else  {
            alert({ message: err.message });
          }
    })
}

  return (
    <PageContainer>
      <section className="container-redefine-Password">
        <div className="RedefinePassword">
          <h2 className="title">Redefinir senha</h2>

          <form className="form" onSubmit={forgotPasswordSubmit}>
            <p>Agora escolha sua nova senha</p>
            <SimpleInput
              id="senha"
              type="password"
              name="senha"
              placeholder="Sua Senha"
              label="Senha"
              onChange={e => setNewPassword(e.target.value)}
              required={true}
            />
            <SimpleInput
              id="senha2"
              type="password"
              name="senha2"
              placeholder="Sua senha novamente"
              label="Repita a senha"
              onChange={e => setConfNewPassword(e.target.value)}
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

export default ForgotPassword;
