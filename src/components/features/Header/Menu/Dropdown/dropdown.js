import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import avatarDefault from "../../../../../assets/img/avatarDefault.png";
import "./dropdown.scss";

const Dropdown = (props) => {

    const { isBlack } = props;
    const color = isBlack ? "black" : "";
    const user = useSelector(state => state.user.data);
    const userPicture = useSelector(state => state.user.picture);

    return (
        <section className={color}>
            <div className={"nicknameUser"} >
                {`Olá, ${user.full_name.split(' ', 1)}`}
                <div className="dropdownIndicatorStyle">
                    <span className="arrowLineStyleLeft" />
                    <span className="arrowLineStyleRight" />
                </div>
            </div>

            <div className="isdrop">
                <div className="dropUser">
                    <div className="infoUser">
                      {userPicture ?
                        <img className="avatarUser" src={userPicture} alt="" />
                      :
                        <img className="avatarUser" src={avatarDefault} alt="" />

                      }
                        <div className="user">
                            <div className="nameUser">{user.full_name}</div>
                            <div className="emailUser">{user.email}</div>
                        </div>
                    </div>

                    <div className="linksUser">
                        <span className="border" />
                        <Link className="userLinks" to="/perfil">Meu Perfil</Link>
                        <Link to="/logout" className="userLinks">Sair</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Dropdown;
