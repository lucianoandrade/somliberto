import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Auth } from "aws-amplify";
import { useDispatch } from "react-redux";


import { getUserData } from "../../store/actions/user.action";
import { SimpleInput } from "../../components/elements/Input";
import Botao from "../../components/elements/Botao";

import PageContainer from "../../components/features/PageContainer/PageContainer";
import SocialLogin from "../../components/features/SocialLogin/SocialLogin";


import "./Login.scss";

function Login(props) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (ev) => {

    ev.preventDefault();
    Auth.signIn(email, senha)
      .then((response) => {
        console.log("Login com sucesso. Response: ", response);

        dispatch(getUserData(response.attributes.sub));

        props.history.push("/");
      })
      .catch((error) => {
        console.log("Erro fazendo login: ", error);
        if (error.code === "UserNotConfirmedException") {
          props.history.push("/codconfirmacao", { email: email });
        }else if( error.code === "NotAuthorizedException") {
          setErro("O e-mail ou senha inseridos são inválidos")
        }else {
          alert(error.message);
        }
      });
  };

  return (
    <PageContainer>
      <section className="container-login">
        <div className="login">
          <h2 className="title">Acesse sua conta</h2>
          {erro &&
            <div className="error">
              {erro}
            </div>
          }
          <form className="form" onSubmit={handleSubmit}>
            <SimpleInput
              id="email"
              type="email"
              name="email"
              placeholder="Ex: seunome@email.com"
              label="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required={true}
            />
            <SimpleInput
              id="senha"
              type="password"
              name="senha"
              placeholder="Sua Senha"
              label="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required={true}
            />
            <Botao className="botao" classes="red big">
              Entrar
            </Botao>
          </form>

          <SocialLogin />

          <div className="forgot-password">
            <Link to="/esquecisenha">Esqueci minha senha</Link>
          </div>

          <div className="no-account">
            <p>Ainda não tem uma conta?</p>
            <Link to="/cadastro">Cadastre-se</Link>
          </div>
        </div>
      </section>
    </PageContainer>
  );
}

export default Login;
