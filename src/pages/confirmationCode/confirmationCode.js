import React from "react";
import { Form, withFormik } from "formik";
import * as Yup from "yup";
import { Auth } from "aws-amplify";
import { withRouter } from "react-router-dom";
import { FormikInput } from "../../components/elements/Input";
import PageContainer from "../../components/features/PageContainer/PageContainer";
import Botao from "../../components/elements/Botao";

import "./confirmationCode.scss";

const ConfirmationCode = (props) => { 
  return (
    <PageContainer>
      <section className="container-confirmation-code">
        <div className="code">
          <h2 className="title">Confirme o código enviado ao seu e-mail</h2>
          <Form className="form">
            <p>
              Enviamos um código de confirmação por e-mail para você. Por favor,
              digite-o abaixo.
            </p>
            <FormikInput
              id="code"
              name="code"
              type="text"
              placeholder="Código de confirmação"
              label="Código"
            />
            <Botao className="botao" classes="red big" required={props.isSubmitting}>
              Próximo
            </Botao>
          </Form>
        </div>
      </section>
    </PageContainer>
  );
};

const ConfirmationCodeForm = withRouter(
  withFormik({
    mapPropsToValues({ code }) {
      return {
        code: code || ""
      };
    },
    validationSchema: Yup.object().shape({
      code: Yup.string()
        .required("Campo obrigatório")
        .length(6, "Codigo inválido")
    }),

    handleSubmit({ code }, { props, setFieldError, setSubmitting }) {
      setSubmitting(true);

      if(props.location.state.pathname === "/esquecisenha") {
        props.history.push('/novasenha', {email: props.history.location.state.email, code: code})
      } else {
      Auth.confirmSignUp(props.history.location.state.email, code.toString())
        .then(result => {
          setSubmitting(false);
          Auth.signIn(props.history.location.state.email, props.history.location.state.senha)
            .then(response => {
              props.history.push("/seusdados", {
                email: props.history.location.state.email,
                senha: props.history.location.state.senha,
                confirmationCode: code
              });
            })
            .catch(error => {
              const messageDefault = "Ocorreu um erro inesperado.";

              const selectErrorMessage = {
                NotAuthorizedException: "E-mail ou senha incorretos.",
                UserNotFoundException: "O usuário não foi encontrado.",
                PasswordResetRequiredException:
                  'A sua senha foi resetada. Crie uma nova em "esqueci minha senha".',
                InvalidPasswordException:
                  "A senha deve conter ao mínimo 8 dígitos."
              };

              return selectErrorMessage[error.code] || messageDefault;
            });
        })
        .catch(error => {
          window.alert("Codigo de confirmação invalido");
          setSubmitting(false);
        });
      }
    }
  })(ConfirmationCode)
);

export default ConfirmationCodeForm;
