import React from "react";
import { withRouter, Link } from "react-router-dom";
import { Auth } from "aws-amplify";
import * as Yup from "yup";
import { withFormik, Form } from "formik";
import PageContainer from "../../components/features/PageContainer/PageContainer";
import { FormikInput } from "../../components/elements/Input";
import Botao from "../../components/elements/Botao";

import "./Register.scss";

const Cadastro = props => {
  return (
    <PageContainer>
      <section className="container-cadastro">
        <div className="cadastro">
          <h2 className="title">Crie sua conta</h2>

          <Form className="form">
            <FormikInput
              id="email"
              type="email"
              name="email"
              placeholder="Ex: seunome@email.com"
              label="E-mail"
              required={true}
            />
            <FormikInput
              id="senha"
              type="password"
              name="senha"
              placeholder="Sua Senha"
              label="Senha"
              required={true}
            />
            <FormikInput
              id="senha2"
              type="password"
              name="senha2"
              placeholder="Sua senha novamente"
              label="Repita a senha"
              required={true}
            />
            <Botao
              className="botao"
              classes="red big"
              required={props.isSubmitting}
            >
              Próximo
            </Botao>
          </Form>

          <div className="have-account">
            <Link to="/login">Já tenho conta</Link>
          </div>
        </div>
      </section>
    </PageContainer>
  );
};

const CadastroForm = withRouter(
  withFormik({
    mapPropsToValues({ email, senha, senha2 }) {
      return {
        email: email || "",
        senha: senha || "",
        senha2: senha2 || ""
      };
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required("Campo obrigatório")
        .email("Email inválido"),
      senha: Yup.string()
        .required("Campo obrigatório")
        .min(8, "Mínimo 8 caracteres"),
      senha2: Yup.string().required("Campo obrigatório")
    }),

    handleSubmit({ email, senha, senha2 },{ props, setFieldError, setSubmitting }) {
      if (senha !== senha2) {
        setFieldError("senha", "As senhas digitadas não estão idênticas.");
        setFieldError("senha2", "As senhas digitadas não estão idênticas.");
        return;
      }
      setSubmitting(true);

      Auth.signUp(email, senha)
        .then(result => {
          props.history.push("/codconfirmacao", { email: email, senha: senha });
        })
        .catch(error => {
          switch (error.code) {
            case "UsernameExistsException":
              setFieldError("email", "Email já está em uso.");
              break;
            default:
              window.alert("Erro fazendo signup");
              break;
          }
          setSubmitting(false);
        });
    }
  })(Cadastro)
);

export default CadastroForm;
