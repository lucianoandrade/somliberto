import React from "react";

import { withRouter } from "react-router-dom";
import { useSelector, connect } from "react-redux";

import * as Yup from "yup";
import CPF from "cpf-check";
import { withFormik, Form, Field, ErrorMessage } from "formik";
import config from "../../config/constants";
import { API, Auth } from "aws-amplify";
import { setUserData, setUserPicture } from "../../store/actions/user.action";

import { FormikInput, MaskFormikInput, SimpleInput } from "../../components/elements/Input";
import Botao from "../../components/elements/Botao";
import Terms from "../../components/features/Terms/Terms";
import PageContainer from "../../components/features/PageContainer/PageContainer";
import Service from "../../service/user/user.service";
import Upload from "../../components/elements/Upload/Upload";
import "./UserData.scss";
import { getSocialUserPicture } from '../../hooks/getSocialUserPicture'

const onlyNumbers = _text => {
  const replaced = _text ? _text.replace(/[^\d]/g, "") : "";
  return replaced;
};

function test_cpf(message) {
  if (message === void 0) {
    message = "CPF inválido";
  }

  return this.test({
    message: message,
    name: "cpf",
    exclusive: true,
    test: function test(value) {
      const replaced = onlyNumbers(value);
      return CPF.validate(replaced);
    }
  });
}

Yup.addMethod(Yup.string, "cpf", test_cpf);

const address_state = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS",
  "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC",
  "SP", "SE", "TO"];

function UserData (props) {
  const siteInfo = useSelector(store => store.siteInfo.data);
  const user = useSelector(store => store.user.data.cpf);

  const termLinkStyle = (
    <span
      style={{
        color: "#c00000",
        textDecoration: "underline",
        fontStyle: "italic",
        cursor: "pointer"
      }}
    >
      Termos e Condições de Uso
    </span>
  );
  return (
    <PageContainer auth={user ? "exists" : ""}>
      <section className="container-userData">
        <div className="userData">
          <h2 className="title">Quase pronto!</h2>
          <Form className="form">
            <div>
              <Upload
                placeholder={"Nenhuma imagem selecionada"}
                source="image_id"
                getUrl={Service.getUrlImage}
                keyImageUrl="image_url"
              />
            </div>
            <h3>Dados pessoais</h3>
            <div className="personalData">
              <FormikInput
                id="full_name"
                name="full_name"
                type="text"
                placeholder="Seu nome completo"
                label="Nome completo"
                required={true}
              />
              <div className="twoFields">
                <MaskFormikInput
                  name="cpf"
                  id="cpf"
                  mask={[/[0-9]/,/\d/,/\d/,".",/\d/,/\d/,/\d/,".",/\d/,/\d/,/\d/,"-",/\d/,/\d/]}
                  type="text"
                  placeholder="Apenas números"
                  label="CPF"
                  required={true}
                />

                <MaskFormikInput
                  name="phone_number"
                  id="phone_number"
                  mask={["(",/[0-9]/,/\d/,")"," ",/\d/,/\d/,/\d/,/\d/,/\d/,"-",/\d/,/\d/,/\d/,/\d/]}
                  type="tel"
                  placeholder="Ex: (21) 92345-6789"
                  label="Telefone"
                  required={true}
                />
              </div>
            </div>
            <h3>Endereço</h3>

            <div className="address">
              {/*<div className="twoFieldstwo">
                <MaskFormikInput
                  name="address_zip_code"
                  mask={[/[0-9]/,/\d/,/\d/,/\d/,/\d/,"-",/\d/,/\d/,/\d/]}
                  id="address_zip_code"
                  type="text"
                  placeholder="Apenas números"
                  label="cep"
                  required={true}
                />

                <FormikInput
                  name="address_street"
                  id="address_street"
                  type="text"
                  placeholder="Preencha seu endereço"
                  label="Endereco"
                  required={true}
                />
              </div>
              <div className="twoFieldstwo">
                <FormikInput
                  name="address_number"
                  id="address_number"
                  type="text"
                  placeholder="Número"
                  label="Número"
                  required={true}
                />
                <FormikInput
                  name="address_complement"
                  id="address_complement"
                  type="text"
                  placeholder="Complemento"
                  label="Complemento (opcional)"
                />
              </div> */}
              <div className="twoFieldstwo">

                <fieldset className="field">
                  <label className="label" htmlFor="address_state">Estado</label>
                  <Field id="address_state" name="address_state" className="input" placeholder="Estado" required={true} component="select">
                    <option value="">UF</option>
                    { address_state.map((address_state, index) => <option value={ address_state } key={ index }>{ address_state }</option>) }
                  </Field>
                  <ErrorMessage name={address_state}>
                    {msg => <div className="messageError">{msg}</div>}
                  </ErrorMessage>
                </fieldset>

                <FormikInput
                  name="address_city"
                  id="address_city"
                  type="text"
                  placeholder="Cidade"
                  label="Cidade"
                  required={true}
                />
              {/*<FormikInput
                  name="address_neighborhood"
                  id="address_neighborhood"
                  type="text"
                  placeholder="Bairro"
                  label="Bairro"
                  required={true}
                /> */}
              </div>
            </div>
            <div className="temosUso">
              <h3>Termos e Condições de uso</h3>
              <div className="check">
                <SimpleInput
                  name="terms"
                  id="terms"
                  type="checkbox"
                  placeholder=""
                  label=""
                  required={true}
                />
              {siteInfo && siteInfo.terms_of_use &&
                <Terms terms={siteInfo.terms_of_use} linkText={<>Declaro estar ciente e aceitar os {termLinkStyle} da Som Livre.</>}/>
              }
              </div>
            </div>
            <Botao classes="red big">
              Criar conta
            </Botao>
          </Form>
        </div>
      </section>
    </PageContainer>
  );
};

const mapDispatchToProps = dispatch => {
  return {

    setUserData: (data) => dispatch(setUserData(data)),
    setUserPicture: (data) => dispatch(setUserPicture(data)),
  }
}


const UserDataForm = withRouter(
  withFormik({
    mapPropsToValues({
      address_city,
      address_complement,
      address_neighborhood,
      address_number,
      address_state,
      address_street,
      address_zip_code,
      cpf,
      full_name,
      phone_number,
      image_id,
      image_url
    }) {
      return {
        address_city: address_city || "",
        address_complement: address_complement || "",
        address_neighborhood: address_neighborhood || "",
        address_number: address_number || "",
        address_state: address_state || "",
        address_street: address_street || "",
        address_zip_code: address_zip_code || "",
        cpf: cpf || "",
        full_name: full_name || "",
        phone_number: phone_number || "",
        image_id: image_id || "",
        image_url: image_url || ""
      };
    },
    validationSchema: Yup.object().shape({
      full_name: Yup.string().required("Digite seu nome completo!"),
      cpf: Yup.string()
        .cpf("CPF inválido")
        .required("Campo obrigatório"),
      phone_number: Yup.string().required("Digite seu telefone!"),
      //address_zip_code: Yup.string()
      //  .length(9)
      //  .required("Campo obrigatório"),
      //address_street: Yup.string().required("Digite seu endereço!"),
      //address_number: Yup.string().required("Digite o número da sua casa!"),
      address_state: Yup.string().required("Digite seu estado de origem!"),
      address_city: Yup.string().required("Digite sua cidade!"),
      //address_neighborhood: Yup.string().required("Digite seu bairro!")
    }),

    handleSubmit(values, { props }) {

      Auth.currentAuthenticatedUser()
        .then(response => {
          //console.log("VALUES::: ", values);
          const options = {
            body: {
                address_city: values.address_city,
                address_complement: values.address_complement,
                address_neighborhood: values.address_neighborhood,
                address_number: values.address_number,
                address_state: values.address_state,
                address_street: values.address_street,
                address_zip_code: values.address_zip_code,
                cpf: values.cpf,
                email: response.attributes.email,
                entity_id: response.attributes.sub,
                full_name: values.full_name,
                phone_number: values.phone_number,
                image_id: values.image_id
            }
          };
          const socialPicture = getSocialUserPicture(response.attributes)
          API.post(config.APIS.SOMLIVRE, "usuario", options)
            .then(response => {
              //console.log(" DADOS DO USUARIOS VALUES : ", options);
              props.setUserData(response.data);
              if (!response.data.image_id){
                props.setUserPicture(socialPicture)
              }
              if(response.data.image_url){
                props.setUserPicture(response.data.image_url)
              }
              props.history.push("/");
            })
            .catch(error => {
              console.log("Esse é o retorno das options", options);
              console.log(" error : ", error);
              window.alert("Erro ao enviar seus dados, revise os campos.");
            });
        })
        .catch(error => {
          console.log("erro obtendo usuario atual", error);
        });
    }
  })(UserData)
);

//export default UserDataForm;
export default connect(null, mapDispatchToProps)(UserDataForm);
