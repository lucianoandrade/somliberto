import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import PageContainer from "../../components/features/PageContainer/PageContainer";
import EditIcon from "../../components/elements/EditIcon/EditIcon";
import Avatar from "../../assets/img/avatar.png";
import {default as PictureAvatar} from '@material-ui/core/Avatar' ;
import "./Profile.scss";


function Profile() {
  const user = useSelector(state => state.user.data);
  const userPicture = useSelector(state => state.user.picture);

  return (
    <PageContainer>
      <section className="container-profile">
        <div className="user">
          {userPicture ?
            <PictureAvatar className="avatar-pic" src={userPicture} alt="Avatar"/>
            :
            <div className="avatar">

                <img src={Avatar} alt="Avatar"/>
            </div>
          }
          <div className="contact">
            <h2>{user.full_name || "Seu nome ficará Aqui quando você finalizar seu cadastro"}</h2>
            <p>{user.email || "Aqui o seu e-mail"}</p>

          </div>
        </div>
        <div className="tel-cpf">
          <div className="tel">
            <h5>Telefone</h5>
            <p>{user.phone_number || "Seu telefone"}</p>
          </div>
          <div className="cpf">
            <h5>CPF</h5>
            <p>{user.cpf || "CPF"}</p>
          </div>
        </div>
        <div className="tel-cpf">
          <div className="tel">
            <h5>Cidade</h5>
            <p>{user.address_city}</p>
          </div>
          <div className="cpf">
            <h5>Estado</h5>
            <p>{user.address_state}</p>
          </div>
        </div>
           {/*<div className="endereco">
            <h5>Cidade</h5>

            <h5>Endereço</h5>

             <p>{user.address_street ? `${user.address_street}, ${user.address_number}, ${user.address_complement}, ${user.address_neighborhood} - ${user.address_zip_code} - ${user.address_city}, ${user.address_state}` : "E aqui seu endereço"}</p>
          </div>*/}
        <div className="edit-link-wrapper">
          <div className="edit-link">
            <EditIcon>
              <Link to="/editarperfil">
                Editar perfil
              </Link>
            </EditIcon>
          </div>
        </div>
      </section>
    </PageContainer>
  );
}

export default Profile;
